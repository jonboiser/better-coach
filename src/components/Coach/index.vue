<template>

  <div>
    <h1>Real-time lessons</h1>
    <label class="label" for="classname">Class</label>
    <div class="title" id="classname">Hackathon demo</div>
    <label class="label" for="lessonname">Lesson</label>
    <div class="title" id="lessonname">Olympics trivia</div>
    <form class="pure-form pure-form-stacked">
      <div class="pure-g table">
        <div class="pure-u-1-2 table-header">
          Group by
          <label for="learner">
            <input
              v-model="groupBy"
              id="learner"
              type="radio"
              name="groupBy"
              value="learner"
            >
            learners
          </label>
          <label for="resource">
            <input
              v-model="groupBy"
              id="resource"
              type="radio"
              name="groupBy"
              value="resource"
            >
            questions
          </label>
        </div>
        <div class="pure-u-1-2 table-header">
          <label class="pure-checkbox">
            <input type="checkbox" v-model="perfSort">
            Where is help needed?
          </label>
        </div>
      </div>
    </form>
    <transition-group name="group" tag="div">
      <Group
        v-for="group in groups"
        :key="group.id"
        :title="group.title"
        :contents="group.contents"
      />
    </transition-group>
  </div>

</template>


<script>

import L from 'lodash';
import axios from 'axios';
import io from 'socket.io-client';
import Group from './Group';
import questions from '../../assets/questions';

const MAX = 50;

function questionTitle(id) {
  const number = id + 1;
  let name = questions[id].question;
  if (name.length >= MAX) {
    name = `${name.substring(0, MAX)} ...`;
  }
  return `${number}. ${name}`;
}

function historyItemToAttemptLog(historyItem) {
  return {
    id: historyItem.questionID,
    attempts: historyItem.attempts,
    title: questionTitle(historyItem.questionID),
  };
}

function questionIdToContentList(id, report) {
  const contents = [];
  for (let i = 0; i < report.length; i += 1) {
    const userInfo = report[i];
    for (let j = 0; j < userInfo.history.length; j += 1) {
      if (userInfo.history[j].questionID === id) {
        contents.push({
          id: userInfo.username,
          attempts: userInfo.history[j].attempts,
          title: userInfo.username,
        });
        break;
      }
    }
  }
  return contents;
}

/**
 * contents :: { attempts: boolean[] }
 */
function perfSortContents(contents) {
  const okWeight = 3;
  const wrongWeight = -1;
  const sorted = L.sortBy(contents, (c) => {
    const [right, wrong] = L.partition(c.attempts);
    return (right.length * okWeight) + (wrong.length * wrongWeight);
  });
  return sorted.reverse();
}

function perfSortGroups(groups) {
  const okWeight = 3;
  const wrongWeight = -1;
  const [hasAttempts, noAttempts] = L.partition(groups, g => g.contents.length > 0);
  const sortedWithAttempts = L.sortBy(hasAttempts, (g, idx) => {
    const allAttempts = L.flatMap(g.contents, x => x.attempts || []);
    const [right, wrong] = L.partition(allAttempts);
    const score = (right.length * okWeight) + (wrong.length * wrongWeight);
  }).reverse();
  return [...sortedWithAttempts, ...noAttempts];
}

export default {
  name: 'Coach',
  data() {
    return {
      groupBy: 'learner',
      perfSort: false,
      report: [],
    };
  },
  components: {
    Group,
  },
  mounted() {
    axios('/api/coachreport').then((res) => {
      this.report = res.data;
      // don't open the socket until the initial load is done
      const socket = io();
      socket.on('update coach', update => this.updateReport(update));
    });
  },
  computed: {
    groupByLearner() {
      return this.groupBy === 'learner';
    },
    learnerGroups() {
      return this.report.map(userInfo => ({
        title: userInfo.username,
        contents: userInfo.history.map(historyItemToAttemptLog),
        id: userInfo.username,
      }));
    },
    resourceGroups() {
      return questions.map((question, index) => ({
        title: questionTitle(index),
        contents: questionIdToContentList(index, this.report),
        id: index,
      }));
    },
    groups() {
      let g;
      if (this.groupByLearner) {
        g = this.learnerGroups;
      } else {
        g = this.resourceGroups;
      }
      if (this.perfSort) {
        return this.sortByPerformance(g);
      }
      return g;
    },
  },
  methods: {
    sortByPerformance(groups) {
      const groupz = groups.map(g => ({
        ...g,
        contents: perfSortContents(g.contents),
      }));
      if (this.groupBy === 'learner') {
        return groupz;
      }
      return perfSortGroups(groupz);
    },
    test_update(name, qid, val) {
      this.updateReport({
        username: name,
        questionID: qid,
        lastAttempt: val,
      });
    },
    updateReport(update) {
      const userMatch = this.report.find(x => x.username === update.username);
      if (!userMatch) {
        this.report.push({
          username: update.username,
          history: [{
            questionID: update.questionID,
            attempts: [update.lastAttempt],
          }],
        });
      } else {
        const questionMatch = userMatch.history.find(x => x.questionID === update.questionID);
        if (!questionMatch) {
          userMatch.history.push({
            questionID: update.questionID,
            attempts: [update.lastAttempt],
          });
        } else {
          questionMatch.attempts.push(update.lastAttempt);
        }
      }
    },
  },
};
</script>


<style scoped>

  label {
    user-select: none;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .table {
    margin-top: 24px;
  }

  .table-header {
    font-weight: bold;
    font-size: 16px;
  }

  .group-move {
    transition: transform 0.4s;
  }

</style>

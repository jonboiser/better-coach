<template>

  <div>
    <h1>Real-time coach view</h1>
    <label class="label" for="classname">Class</label>
    <div class="title" id="classname">Hackathon demo</div>
    <label class="label" for="lessonname">Lesson</label>
    <div class="title" id="lessonname">Olympics trivia</div>
    <form class="pure-form">
      <div>
        Group by
        <label for="learner">
          <input
            v-model="groupBy"
            id="learner"
            type="radio"
            name="groupBy"
            value="learner"
          >
          Learner
        </label>
        <label for="resource">
          <input
            v-model="groupBy"
            id="resource"
            type="radio"
            name="groupBy"
            value="resource"
          >
          Question
        </label>
      </div>
      <label class="pure-checkbox">
        <input type="checkbox" v-model="perfSort">
        Sort by performance
      </label>
    </form>
    <div class="pure-g table">
      <div class="pure-u-1-2 table-header">
        {{ primaryLabel }}
      </div>
      <div class="pure-u-1-2 table-header">
        {{ secondaryLabel }}
      </div>
    </div>
    <!-- Delete this box -->
    <div style="border: 1px solid blue">
      <p>name:<input type="text" v-model="test_name"></p>
      <p>QID<input type="number" v-model="test_qid"></p>
      <p>value<input type="checkbox" v-model="test_val"></p>
      <p><button @click="test_update">update</button></p>
    </div>
    <!-- / Delete this box -->
    <Group
      v-for="group in groups"
      :key="group.id"
      :title="group.title"
      :contents="group.contents"
    />
  </div>

</template>


<script>

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

export default {
  name: 'Coach',
  data() {
    return {
      groupBy: 'learner',
      perfSort: false,
      report: [],
      // delete this state
      test_name: 'no one',
      test_qid: 0,
      test_val: 0,
      // / delete this state
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
    primaryLabel() {
      return this.groupByLearner ? 'Learner' : 'Question';
    },
    secondaryLabel() {
      return this.groupByLearner ? 'Question' : 'Learner';
    },
    learnerGroups() {
      return this.report.map(userInfo => ({
        title: userInfo.username,
        contents: userInfo.history.map(historyItemToAttemptLog),
      }));
    },
    resourceGroups() {
      return questions.map((question, index) => ({
        title: questionTitle(index),
        contents: questionIdToContentList(index, this.report),
      }));
    },
    groups() {
      return this.groupByLearner ? this.learnerGroups : this.resourceGroups;
    },
  },
  methods: {
    // delete this function
    test_update() {
      console.log('test_update', this.test_name, this.test_qid);
      const sampleMsg = {
        username: this.test_name,
        questionID: parseInt(this.test_qid, 10),
        lastAttempt: Boolean(this.test_val),
      };
      this.updateReport(sampleMsg);
    },
    // / delete this function
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
    font-size: 18px;
  }

</style>

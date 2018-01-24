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
    <pre>
      <!-- {{ JSON.stringify(report, null, 2) }} -->
      <!-- {{ groups }} -->
    </pre>
    <Group
      v-for="group in groups"
      :key="group.id"
      :title="group.title"
      :contents="group.contents"
    />
  </div>

</template>


<script>

// const sampleMsg =  {
//   username: 'jb',
//   questionID: 2,
//   attempts: [true, false, false],
// }


import questions from '../../assets/questions';
// import axios from 'axios';
// import io from 'socket.io-client';
import sampleDB from './sampleDB';
import Group from './Group';

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
      data: sampleDB,
      groupBy: 'learner',
      perfSort: false,
      report: null,
    };
  },
  components: {
    Group,
  },
  mounted() {
    console.log(this.data);
    // console.log('mounted');
    // const socket = io();
    // socket.on('update coach', update => this.updateReport(update));
    // axios('/api/coachreport').then((res) => { this.report = res.data; });
    // this.socket = io('http://localhost:4000');
    // this.socket.on('update', msg => console.log(msg));
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
      return this.data.map(userInfo => ({
        title: userInfo.username,
        contents: userInfo.history.map(historyItemToAttemptLog),
      }));
    },
    resourceGroups() {
      return questions.map((question, index) => ({
        title: questionTitle(index),
        contents: questionIdToContentList(index, this.data),
      }));
    },
    groups() {
      return this.groupByLearner ? this.learnerGroups : this.resourceGroups;
    },
  },
  methods: {
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

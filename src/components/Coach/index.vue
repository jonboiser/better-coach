<template>

  <div>
    <h1>Real-time coach view</h1>
    <label class="label" for="classname">Class</label>
    <div class="title" id="classname">First grade</div>
    <label class="label" for="lessonname">Lesson</label>
    <div class="title" id="lessonname">Phonics</div>
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
          Resource
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
    <Group title="tttttt" />
    <pre v-if="report">
      {{ JSON.stringify(report, null, 2) }}
    </pre>
  </div>

</template>


<script>

// const sampleMsg =  {
//   username: 'jb',
//   questionID: 2,
//   attempts: [true, false, false],
// }


// import questions from '../../assets/questions';
import axios from 'axios';
import io from 'socket.io-client';
import sampleDB from './sampleDB';
import Group from './Group';

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
    console.log('mounted');
    const socket = io();
    socket.on('update coach', update => this.updateReport(update));
    axios('/api/coachreport').then((res) => { this.report = res.data; });
    // this.socket = io('http://localhost:4000');
    // this.socket.on('update', msg => console.log(msg));
  },
  computed: {
    groupByLearner() {
      return this.groupBy === 'learner';
    },
    primaryLabel() {
      return this.groupByLearner ? 'Learner' : 'Resource';
    },
    secondaryLabel() {
      return this.groupByLearner ? 'Resource' : 'Learner';
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

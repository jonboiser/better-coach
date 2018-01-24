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
        <input type="checkbox">
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
  </div>

</template>


<script>

// const sampleMsg =  {
//   username: 'jb',
//   questionID: 2,
//   attempts: [true, false, false],
// }


// import questions from '../../assets/questions';
import sampleDB from './sampleDB';

export default {
  name: 'Coach',
  data() {
    return {
      data: sampleDB,
      groupBy: 'learner',
    };
  },
  mounted() {
    console.log(this.data);
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

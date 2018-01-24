<template>

  <div>
    <h1>Real-time coach view</h1>
    <label class="label" for="classname">Class</label>
    <div class="title" id="classname">First grade</div>
    <label class="label" for="lessonname">Lesson</label>
    <div class="title" id="lessonname">Phonics</div>
    <div>
      stuff
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
    };
  },
  mounted() {
    console.log(this.data);
    // this.socket = io('http://localhost:4000');
    // this.socket.on('update', msg => console.log(msg));
  },
  computed: {
  },
  methods: {
  },
};
</script>


<style scoped>

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

</style>

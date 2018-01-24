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
import io from 'socket.io-client';
import axios from 'axios';
import questions from '../../assets/questions';

export default {
  name: 'Quiz',
  data() {
    return {};
  },
  mounted() {
    this.socket = io('http://localhost:4000');
    this.socket.on('submit answer echo', answer => console.log(answer));
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

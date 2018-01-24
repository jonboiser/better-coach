<template>

  <div>
    <h1>Hey {{ username }}!!!</h1>
    <h1>The Quiz</h1>
    <div v-if="currentQuestion" class="exercise">
      <h3>{{ currentQuestion.question }}</h3>
      <div class="responses">
        <template v-for="(option, i) in currentQuestion.options">
          <input
            v-model="selectedResponse"
            type="radio"
            name="response"
            :value="i"
            :id="`response${i}`"
            :key="i"
            :disabled="responseIsCorrect"
          />
          <label
            :for="`response${i}`"
            :key="`label${i}`"
          >{{ option }}
          </label>
          <br :key="`br${i}`">
        </template>
      </div>
      <div class="buttons">
        <button
          v-if="!responseIsCorrect"
          type="submit"
          @click="submitAnswer"
        >
          Submit
        </button>
        <button
          v-if="responseIsCorrect"
          @click="goToNextQuestion"
        >
          Next
        </button>
      </div>
      <div v-if="numAttempts > 0" class="feedback">
        <span v-if="responseIsCorrect">
          Nice!!!
        </span>
        <span v-else>
          Wrong answer! Try again!
        </span>
      </div>
    </div>
    <div v-else>
      You're done!
    </div>
  </div>

</template>


<script>
import io from 'socket.io-client';
import axios from 'axios';
import questions from '../assets/questions';

export default {
  name: 'Quiz',
  data() {
    return {
      selectedResponse: 0,
      submitted: false,
      questionIndex: 0,
      numAttempts: 0,
      responseIsCorrect: false,
      socket: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:4000');
    // this.socket.on('interval', i => console.log(i));
    this.socket.on('submit answer echo', answer => console.log(answer));
  },
  computed: {
    questions() {
      return questions.map(q => ({
        question: q.question,
        options: q.options,
      }));
    },
    currentQuestion() {
      return questions[this.questionIndex];
    },
    username() {
      return this.$router.currentRoute.params.username;
    },
  },
  methods: {
    selectedResponseIsCorrect() {
      return Number(this.selectedResponse) === this.currentQuestion.answer;
    },
    submitAnswer() {
      axios.post('/api/answerquestion', {

      });
      this.socket.emit('submit answer', {
        username: this.username,
        question: this.questionIndex,
        isCorrect: this.selectedResponseIsCorrect(),
      });
      this.numAttempts = this.numAttempts + 1;
      if (this.selectedResponseIsCorrect()) {
        this.responseIsCorrect = true;
      }
    },
    goToNextQuestion() {
      this.selectedResponse = 0;
      this.numAttempts = 0;
      this.responseIsCorrect = false;
      this.questionIndex = this.questionIndex + 1;
    },
  },
};
</script>


<style scoped>

.exercise {
  background-color: pink;
  padding: 1rem;
}
</style>

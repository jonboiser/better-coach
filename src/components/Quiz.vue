<template>

  <div class="pure-g quiz">
    <div class="pure-u-1">
      <h1>Hey {{ username }}!!!</h1>
      <h1>The Quiz</h1>
    </div>
    <div
      v-if="currentQuestion"
      class="exercise pure-u-1"
    >
      <h3>{{ currentQuestion.question }}</h3>
      <form class="pure-form">
        <template v-for="(option, i) in currentQuestion.options">
          <label
            class="label pure-radio"
            :for="`response${i}`"
            :key="`label${i}`"
          >
            <input
              v-model="selectedResponse"
              type="radio"
              name="response"
              :value="i"
              :id="`response${i}`"
              :key="i"
              :disabled="responseIsCorrect"
            />
          {{ option }}
          </label>
        </template>
      </form>
      <div class="buttons pure-u-1">
        <button
          class="pure-button"
          v-if="!responseIsCorrect"
          type="submit"
          @click="submitAnswer"
        >
          Submit
        </button>
        <button
          class="pure-button"
          v-if="responseIsCorrect"
          @click="goToNextQuestion"
        >
          Next
        </button>
        <span v-if="numAttempts > 0" class="feedback">
          <span v-if="responseIsCorrect">
            Nice!!!
          </span>
          <span v-else>
            Wrong answer! Try again!
          </span>
        </span>
      </div>
    </div>
    <div v-else>
      You're done!
    </div>
  </div>

</template>


<script>
import L from 'lodash';
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
  created() {
    this.submitAnswer = L.throttle(this.submit.bind(this), 500);
  },
  methods: {
    selectedResponseIsCorrect() {
      return Number(this.selectedResponse) === this.currentQuestion.answer;
    },
    submit() {
      console.log('yoyo');
      axios.post('/api/answerquestion', {
        username: this.username,
        questionID: this.questionIndex,
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

.quiz {
  width: 100%;
}

.buttons {
  margin-top: 10px;
}

.exercise {
  padding: 1rem;
}

.feedback {
  font-weight: bold;
}

</style>

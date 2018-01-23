<template>

  <div>
    <h1>Hey {{ username }}!!!</h1>
    <h1>The Quiz</h1>
    <div class="exercise">
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
            :disabled="submitted"
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
          v-if="!submitted"
          type="submit"
          @click="submitted=true"
        >
          Submit
        </button>
        <button
          v-if="submitted"
          @click="goToNextQuestion"
        >
          Next
        </button>
      </div>
    </div>
  </div>

</template>


<script>
import questions from '../assets/questions';

export default {
  name: 'Quiz',
  data() {
    return {
      selectedResponse: '1',
      submitted: false,
      questionIndex: 0,
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
      return this.questions[this.questionIndex];
    },
    username() {
      return this.$router.currentRoute.params.username;
    },
  },
  methods: {
    submitAnswer(response) {
      // send current question, plus whether response was correct
      console.log(response);
    },
    goToNextQuestion() {
      this.selectedResponse = '0';
      this.submitted = false;
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

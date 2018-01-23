<template>

  <div>
    <h1>Hey {{ $router.currentRoute.params.username }}!!!</h1>
    <h1>The Quiz</h1>
    <div class="exercise">
      <h3>{{ questions[0].question }}</h3>
      <div class="responses">
        <template v-for="i in questions[0].options">
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
          >Answer {{ i }}
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
          @click="submitted=false"
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
      exerciseQuestion: 'What is 1 + 1?',
      selectedResponse: '1',
      range: [1, 2, 3, 4],
      submitted: false,
    };
  },
  computed: {
    questions() {
      return questions.map(q => ({
        question: q.question,
        options: q.options,
      }));
    },
  },
  methods: {
    submitAnswer(response) {
      // send current question, plus whether response was correct
      console.log(response);
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

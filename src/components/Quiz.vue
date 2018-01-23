<template>

  <div>
    <h1>The Quiz</h1>
    <div class="exercise">
      <p>{{ exerciseQuestion }}</p>
      <div class="responses">
        <template v-for="i in range">
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

</template>


<script>
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
  methods: {
    submitAnswer(response) {
      // send current question, plus whether response was correct
      console.log(response);
    },
  },
};
</script>


<style scoped>

</style>

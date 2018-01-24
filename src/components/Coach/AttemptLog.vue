<template>

  <div>
    <!-- inner wrapper is necessary for list transistions -->
    <div
      class="fade"
      :class="{ highlight: highlight, lastAttempt: lastAttempt }"
    >
      <div>
        {{ title }}
      </div>
      <div class="attempts">
        <Attempt
          v-for="(attempt, index) in attempts"
          :key="index"
          :value="attempt"
        />
      </div>
    </div>
  </div>

</template>


<script>

import Attempt from './Attempt';

export default {
  name: 'Group',
  props: {
    title: {
      type: String,
      required: true,
    },
    attempts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      highlight: false,
      timeout: null,
    };
  },
  watch: {
    attempts() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.highlight = true;
      this.timeout = setTimeout(() => {
        this.highlight = false;
        this.timeout = null;
      }, 150);
    },
  },
  computed: {
    lastAttempt() {
      if (this.attempts.length) {
        return this.attempts[this.attempts.length - 1];
      }
      return true;
    },
  },
  components: {
    Attempt,
  },
};
</script>


<style scoped>

  .attempts {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .fade {
    transition: background-color 1s;
  }

  .highlight {
    background-color: maroon;
  }

  .highlight.lastAttempt {
    background-color: green;
  }

</style>

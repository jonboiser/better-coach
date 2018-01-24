<template>

  <div>
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

</style>

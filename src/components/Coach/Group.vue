<template>

  <div class="pure-g group">
    <div class="pure-u-1-2">
      {{ title }}
    </div>
    <div class="pure-u-1-2">
      <AttemptLog
        v-for="content in contents"
        :key="content.id"
        :title="content.title"
        :attempts="content.attempts"
      />
    </div>
  </div>

</template>


<script>

import AttemptLog from './AttemptLog';

export default {
  name: 'Group',
  props: {
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: Array,
      required: true,
      validator(items) {
        return items.every(item => item.id && item.title && item.attempts);
      },
    },
  },
  components: {
    AttemptLog,
  },
};
</script>


<style scoped>

  .group {
    border-top: 1px solid #CCC;
    padding-top: 8px;
    margin-top: 8px;
  }

</style>

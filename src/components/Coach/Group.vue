<template>

  <div class="pure-g group">
    <div class="pure-u-1-2 title">
      {{ title }}
    </div>
    <div v-if="contents.length" class="pure-u-1-2">
      <transition-group name="log">
        <AttemptLog
          v-for="content in contents"
          :key="content.id"
          :title="content.title"
          :attempts="content.attempts"
        />
      </transition-group>
    </div>
    <div v-else class="pure-u-1-2 none">
      no responses
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
        return items.every(item => item.id !== undefined && item.title && item.attempts);
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

  .title {
    font-weight: bold;
  }

  .none {
    color: gray;
  }

  .log-move {
    transition: transform 0.4s;
  }

</style>

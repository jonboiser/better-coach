<template>

  <span class="this-attempt">
    <span class="right" v-if="value">✓</span>
    <span class="wrong" v-else>✗</span>
  </span>

</template>


<script>

export default {
  name: 'Group',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
};
</script>


<style scoped>

  .this-attempt {
    display: inline-block;
    width: 24px;
    text-align: center;
  }

  .right {
    color: green;
  }

  .wrong {
    color: maroon;
  }

</style>

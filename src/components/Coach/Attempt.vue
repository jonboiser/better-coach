<template>

  <span>
    <template v-if="value">✓</template>
    <template v-else>✗</template>
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


<style scoped></style>

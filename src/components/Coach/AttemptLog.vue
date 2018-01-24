<template>

  <div>
    <div>
      attempts: {{ title }}
    </div>
    <div>
      {{ attempts }}
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


<style scoped></style>

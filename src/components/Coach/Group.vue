<template>

  <div class="pure-g table">
    <div class="pure-u-1-2">
      group: {{ title }}
    </div>
    <div class="pure-u-1-2">
      <Attempts title="attempts" />
    </div>
  </div>

</template>


<script>

import Attempts from './Attempts';

export default {
  name: 'Group',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Attempts,
  },
};
</script>


<style scoped></style>

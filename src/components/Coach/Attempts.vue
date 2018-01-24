<template>

  <div>
    <div>
      attempts: {{ title }}
    </div>
    <div>
      stuff
    </div>
  </div>

</template>


<script>

export default {
  name: 'Group',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>


<style scoped></style>

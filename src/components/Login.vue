<template>

  <div>
    <h1>Kolibri Extra-Light</h1>
    <form @submit.prevent="login">
      <label>
        Your Name
        <input v-model="username" />
      </label>
      <br>
      <button type="submit">
        Login
      </button>
      <p v-if="error" class="error">
        Pick a better username!
      </p>
    </form>
  </div>

</template>


<script>
export default {
  data() {
    return {
      username: '',
      error: '',
    };
  },
  methods: {
    login() {
      if (this.username.trim() === '') {
        this.error = 'emptyusername';
        return;
      }
      this.$router.replace({
        name: 'Quiz',
        params: {
          username: this.username,
        },
      });
    },
  },
};
</script>


<style scoped>

.error {
  color: red
}

</style>

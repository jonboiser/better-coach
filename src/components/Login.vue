<template>

  <div>
    <h1>Kolibri extra-light</h1>
    <form @submit.prevent="login" class="pure-form">
      <label>
        Your name
        <input v-model="username" />
      </label>
      <button type="submit" class="pure-button">
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

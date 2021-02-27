<template>
  <div class="registration-container">
    <input-field tag="username" placeholder="Username" @valueUpdated=onUsernameUpdated />
    <input-field tag="email" placeholder="E-mail" @valueUpdated=onEmailUpdated />
    <input-field tag="password" placeholder="Password" @valueUpdated=onPasswordUpdated />
    <input-field tag="password" placeholder="Confirm password" @valueUpdated=onPasswordConfirmUpdated />
  </div>
</template>

<style scoped>
.registration-container {
  border: 1px solid black;  
  padding: 10px;
}
</style>

<script>
import InputField from './InputField.vue';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  components: {
    'input-field': InputField
  },
  methods: {
    onUsernameUpdated(value) {
      this.username = value;
    },
    onEmailUpdated(value) {
      this.email = value;
    },
    onPasswordUpdated(value) {
      this.password = value;
    },
    onPasswordConfirmUpdated(value) {
      this.confirmPassword = value;
    }
  }
}
</script>

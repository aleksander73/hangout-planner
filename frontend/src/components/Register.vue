<template>
  <div class="registration-container">
    <input-field tag="username" placeholder="Username"/>
    <input-field tag="email" placeholder="E-mail"/>
    <input-field tag="password" placeholder="Password"/>
    <input-field tag="password" placeholder="Confirm password" />
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
  }
}
</script>

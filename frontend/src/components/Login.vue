<template>
  <div class="login-container">
    <div class="title-container">
      <h1>Welcome</h1>
    </div>
    <div class="input-container">
      <input-field v-for="(inputField, index) in inputFields" :key=index :ref=inputField.id :model=inputField />
    </div>
    <button @click=register>Log in</button>
    <div class="switch">Don't have an account? <a href="/register">Register in</a></div>
  </div>
</template>

<style scoped>
.login-container {
  align-items: center;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 575px;
  justify-content: center;
  padding: 40px 75px 70px 75px;
  width: 400px;
}

.title-container {
  display: flex;
  justify-content: center;
  width: inherit;
}

.title-container > h1 {
  margin-bottom: 1em;
  text-transform: uppercase;
}

button {
  font-weight: 600;
  height: 65px;
  margin-top: 20px;
  text-transform: uppercase;
  width: 400px;
}

.switch {
  border-top: 1px solid black;
  margin-top: 2em;
  padding-top: 1em;
  text-align: center; 
  width: inherit;
}

.switch > a {
  color: blue;
  text-decoration: none;
}
</style>

<script>
import InputFieldComponent from './InputField.vue';
import { InputField } from '../views/utility';
import apiClient from '../api/ApiClient';

export default {
  data() {
    return {
      inputFields: [
        new InputField('username', 'text', require('../../assets/icons/user.svg'), 'username'),
        new InputField('password', 'password', require('../../assets/icons/password.svg'), 'password')
      ]
    }
  },
  components: {
    'input-field': InputFieldComponent
  },
  methods: {
    getInputFieldById(id) {
      return Object.values(this.$refs).find(ref => ref.model.id === id);
    },
    async login() {
      const username = this.getInputFieldById('username').model.value;
      const password = this.getInputFieldById('password').model.value;
      const loginSucceeded = await apiClient.loginUser(username, password);
        if(loginSucceeded) {
          console.log(`User ${username} has been logged in`);
        } else {
          console.log('We had problems logging your user in');            
        }
    }
  }
}
</script>

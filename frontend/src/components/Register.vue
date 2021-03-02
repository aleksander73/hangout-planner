<template>
  <div class="registration-container">
    <div class="input-container">
      <input-field v-for="(inputField, index) in inputFields" :key=index :ref=inputField.id :model=inputField @lostFocus=onLostFocus />
    </div>
    <button @click=register>Register</button>
  </div>
</template>

<style scoped>
.registration-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
}

button {
  background-color: rgb(22, 142, 255);
  border: 0;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 1.25em;
  height: 45px;
  outline: none;
  padding: 0.5em 1em;
  transition: background-color 0.25s ease;
}

button:hover {
  background-color: rgb(0, 120, 233);
}
</style>

<script>
import InputFieldComponent from './InputField.vue';
import { InputField } from '../views/utility';
import { isEmail, max, min, required, sameAs, simple, usernameUnique } from '../views/utility/validations';
import apiClient from '../api/ApiClient';

export default {
  data() {
    return {
      inputFields: [
        new InputField('username', 'text', require('../../assets/icons/user.svg'), 'username', [ required, max(255), simple, usernameUnique ]),
        new InputField('email', 'text', require('../../assets/icons/email.svg'), 'e-mail', [ required, max(255), isEmail ]),
        new InputField('password', 'password', require('../../assets/icons/password.svg'), 'password', [ required, min(8), max(255) ]),
        new InputField('confirm-password', 'password', require('../../assets/icons/password.svg'), 'confirm password', [ required, min(8), max(255) ])
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
    async onLostFocus(data) {
      if(data.id === 'password') {
        let otherField = this.$refs['confirm-password'];
        if(otherField.model.value) {
          await otherField.validate();
        }
      }
      if(data.id === 'confirm-password') {
        let otherField = this.$refs['password'];
        if(otherField.model.value) {
          await otherField.validate();
        }
      }
    },
    async register() {
      const inputFields = Object.values(this.$refs);
      const valid = inputFields.every(ref => ref.isValid);
      if(valid) {
        const username = this.getInputFieldById('username').model.value;
        const email = this.getInputFieldById('email').model.value;
        const password = this.getInputFieldById('password').model.value;
        const registrationSucceeded = await apiClient.registerUser(username, email, password);
        if(registrationSucceeded) {
          const loginSucceeded = await apiClient.loginUser(username, password);
          if(loginSucceeded) {
            console.log(`User ${username} has been logged in`);
          } else {
            console.log('We had problems logging your user in');            
          }
        } else {
          console.log('We had problems registering your user');
        }
      } else {
        inputFields.filter(inputField => !inputField.isValid).forEach(inputField => inputField.validate());
      }
    }
  },
  mounted() {
    let password = this.getInputFieldById('password').model;
    let confirmPassword = this.getInputFieldById('confirm-password').model;
    confirmPassword.addValidation(sameAs(password, 'password'));
  }
}
</script>

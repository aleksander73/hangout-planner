<template>
  <div class="registration-container">
    <div class="title-container">
      <h1>Join us</h1>
    </div>
    <div class="input-container">
      <input-field v-for="(inputField, index) in inputFields" :key=index :ref=inputField.id :model=inputField :validateInput=true @lostFocus=onLostFocus />
    </div>
    <button @click=register>Register</button>
    <div class="switch">Already have an account? <a href="/login">Log in</a></div>
  </div>
</template>

<style scoped>
.registration-container {
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
import { inputValidations } from '../../../src/data/validation';
const { usernameValidation, emailValidation, passwordValidation } = inputValidations.registration;
import { validationFunctions } from '../views/utility';
const { sameAs, usernameUnique } = validationFunctions;
import apiClient from '../api/ApiClient';

export default {
  data() {
    return {
      inputFields: [
        new InputField('username', 'text', require('../../assets/icons/user.svg'), 'username', usernameValidation),
        new InputField('email', 'text', require('../../assets/icons/email.svg'), 'e-mail', emailValidation),
        new InputField('password', 'password', require('../../assets/icons/password.svg'), 'password', passwordValidation),
        new InputField('confirm-password', 'password', require('../../assets/icons/password.svg'), 'confirm password', passwordValidation)
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
    let username = this.getInputFieldById('username').model;
    let password = this.getInputFieldById('password').model;
    let confirmPassword = this.getInputFieldById('confirm-password').model;
    username.addValidation(usernameUnique);
    confirmPassword.addValidation(sameAs(password, 'password'));
  }
}
</script>

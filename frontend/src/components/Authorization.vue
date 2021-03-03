<template>
  <div class="authorization-container">
    <div class="title-container">
      <h1>{{ title }}</h1>
    </div>
    <div>
      <div :class="newUser ? '': 'hidden'">
        <input-field v-for="(inputField, index) in registerInputFields" :key=index :ref=inputField.id :model=inputField @lostFocus=onLostFocus />
      </div>
      <div :class="newUser ? 'hidden' : ''">
        <input-field v-for="(inputField, index) in loginInputFields" :key=index :ref=inputField.id :model=inputField />
      </div>
    </div>
    <button @click=mainAction>{{ buttonLabel }}</button>
    <div class="switch">{{ switchLabelPrefix }} <span @click=onSwitchClick>{{ switchLabelLink }}</span></div>
  </div>
</template>

<style scoped>
.authorization-container {
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

.switch > span {
  color: blue;
  cursor: pointer;
}

.hidden {
  display: none;
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
      newUser: false,
      registerInputFields: [
        new InputField('r-username', 'text', require('../../assets/icons/user.svg'), 'username', usernameValidation),
        new InputField('r-email', 'text', require('../../assets/icons/email.svg'), 'e-mail', emailValidation),
        new InputField('r-password', 'password', require('../../assets/icons/password.svg'), 'password', passwordValidation),
        new InputField('r-confirm-password', 'password', require('../../assets/icons/password.svg'), 'confirm password', passwordValidation)
      ],
      loginInputFields: [
        new InputField('l-username', 'text', require('../../assets/icons/user.svg'), 'username'),
        new InputField('l-password', 'password', require('../../assets/icons/password.svg'), 'password')
      ],
      registrationInitialized: false
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
      if(data.id === 'r-password') {
        let otherField = this.$refs['r-confirm-password'];
        if(otherField.model.value) {
          await otherField.validate();
        }
      }
      if(data.id === 'r-confirm-password') {
        let otherField = this.$refs['r-password'];
        if(otherField.model.value) {
          await otherField.validate();
        }
      }
    },
    mainAction() {
      this.newUser ? this.register() : this.login();
    },
    async register() {
      const inputFields = Object.values(this.$refs).filter(inputField => inputField.model.id[0] === 'r');
      const valid = inputFields.every(ref => ref.isValid);
      if(valid) {
        const username = this.getInputFieldById('r-username').model.value;
        const email = this.getInputFieldById('r-email').model.value;
        const password = this.getInputFieldById('r-password').model.value;
        const registrationSucceeded = await apiClient.registerUser(username, email, password);
        if(registrationSucceeded) {
          await this.login(username, password);
        } else {
          console.log('We had problems registering your user');
        }
      } else {
        inputFields.filter(inputField => !inputField.isValid).forEach(inputField => inputField.validate());
      }
    },
    async login(username, password) {
      username = username || this.getInputFieldById('l-username').model.value;
      password = password || this.getInputFieldById('l-password').model.value;
      const loginSucceeded = await apiClient.loginUser(username, password);
      if(loginSucceeded) {
        console.log(`User ${username} has been logged in`);
      } else {
        console.log('We had problems logging your user in');            
      }
    },
    onSwitchClick() {
      this.newUser = !this.newUser;
    }
  },
  computed: {
    title() {
      return this.newUser ? 'Join us' : 'Welcome';
    },
    buttonLabel() {
      return this.newUser ? 'Register' : 'Log in';
    },
    switchLabelPrefix() {
      return this.newUser ? 'Already have an account?' : 'Don\'t have an account?';
    },
    switchLabelLink() {
      return this.newUser ? 'Log in' : 'Register';
    }
  },
  mounted() {
    let username = this.getInputFieldById('r-username').model;
    let password = this.getInputFieldById('r-password').model;
    let confirmPassword = this.getInputFieldById('r-confirm-password').model;
    username.addValidation(usernameUnique);
    confirmPassword.addValidation(sameAs(password, 'password'));
  }
}
</script>

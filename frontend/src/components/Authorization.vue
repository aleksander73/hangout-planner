<template>
  <div class="authorization-container">
    <div class="form-container pos-relative">
      <div :class="blinkAnimation.active ? 'blink' : ''">
        <div class="title-container">
          <h1>{{ title }}</h1>
        </div>
        <div :class="newUser ? '': 'hidden'">
          <input-field v-for="(inputField, index) in registerInputFields" :key=index :ref=inputField.id :model=inputField @lostFocus=onLostFocus />
        </div>
        <div :class="newUser ? 'hidden' : ''">
          <input-field v-for="(inputField, index) in loginInputFields" :key=index :ref=inputField.id :model=inputField />
        </div>
        <button @click=mainAction>{{ buttonLabel }}</button>
        <div class="switch">{{ switchLabelPrefix }} <span @click=onSwitchClick>{{ switchLabelLink }}</span></div>
      </div>
      <div :class=errorClass><span>{{ error.message }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.authorization-container {
  align-items: center;
  background-image: url('../../assets/login-background.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.form-container {
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 685px;
  justify-content: center;
  width: 550px;
}

.blink {
  animation: blink .5s linear;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
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

.error {
  border: 1px solid rgb(250, 50, 50);
  bottom: 0;
  cursor: default;
  display: none;
  margin-bottom: 1em;
  opacity: 0;
  padding: 0.5em 1em;
  position: absolute;
}

.error > span {
  color: rgb(250, 50, 50);
}

.error-active {
  align-items: center;
  animation: show-error 3s linear;
  display: flex;
  justify-content: center;
}

@keyframes show-error {
  0% { opacity: 0; }
  5% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}

.pos-relative {
  position: relative;
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
      blinkAnimation: {
        active: false,
        time: 500
      },
      error: {
        message: '',
        animationTime: 3000
      }
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
          this.showError('We had problems registering your user');
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
        this.showError('Invalid username or password');
      }
    },
    onSwitchClick() {
      this.error.message = '';
      this.blinkAnimation.active = true;
      setTimeout(() => {
        this.newUser = !this.newUser;
      }, this.blinkAnimation.time / 2);
      setTimeout(() => {
        this.blinkAnimation.active = false;
      }, this.blinkAnimation.time);
    },
    showError(message) {
      this.error.message = message;
      setTimeout(() => {
        this.error.message = '';
      }, this.error.animationTime);
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
    },
    errorClass() {
      const staticClasses = 'error';
      let dynamicClasses = this.error.message ? 'error-active' : '';
      return `${staticClasses} ${dynamicClasses}`;
    }
  },
  mounted() {
    let username = this.getInputFieldById('r-username').model;
    let password = this.getInputFieldById('r-password').model;
    let confirmPassword = this.getInputFieldById('r-confirm-password').model;
    username.addValidation(usernameUnique);
    confirmPassword.addValidation(sameAs(password, password.placeholder));
  }
}
</script>

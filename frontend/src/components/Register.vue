<template>
  <div class="registration-container">
    <input-field v-for="(inputField, index) in inputFields" :key=index :ref=inputField.id :model=inputField @lostFocus=onLostFocus />
    <button @click=register>Register</button>
  </div>
</template>

<style scoped>
.registration-container {
  border: 1px solid black;  
  padding: 10px;
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
      const valid = Object.values(this.$refs).every(ref => ref.isValid);
      if(valid) {
        const username = this.getInputFieldById('username').model.value;
        const email = this.getInputFieldById('email').model.value;
        const password = this.getInputFieldById('password').model.value;
        await apiClient.registerUser(username, email, password);
      } else {
        console.log('User invalid!');
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

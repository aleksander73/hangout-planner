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
import { isEmail, max, min, required, sameAs, usernameUnique } from '../views/utility/validations';

export default {
  data() {
    return {
      inputFields: [
        new InputField('username', 'text', require('../../assets/icons/user.svg'), 'Username', [ required, usernameUnique, min(3) ]),
        new InputField('email', 'text', require('../../assets/icons/email.svg'), 'E-mail', [ required, isEmail ]),
        new InputField('password', 'password', require('../../assets/icons/password.svg'), 'Password', [ required ]),
        new InputField('confirm-password', 'password', require('../../assets/icons/password.svg'), 'Confirm password', [ required ])
      ]
    }
  },
  components: {
    'input-field': InputFieldComponent
  },
  methods: {
    getInputFieldById(id) {
      return this.inputFields.find(inputField => inputField.id === id);
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
    register() {
      
    }
  },
  created() {
    let password = this.getInputFieldById('password');
    let confirmPassword = this.getInputFieldById('confirm-password');
    confirmPassword.addValidation(sameAs(password, 'password'));
  }
}
</script>

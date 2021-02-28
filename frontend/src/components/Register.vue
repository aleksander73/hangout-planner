<template>
  <div class="registration-container">
    <input-field :model=username />
    <input-field :model=email />
    <input-field :model=password />
    <input-field :model=confirmPassword />
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
import { isEmail, max, min, required, usernameUnique } from '../views/utility/validations';

export default {
  data() {
    return {
      username: new InputField('text', require('../../assets/icons/user.svg'), 'Username', [ required, usernameUnique, min(3) ]),
      email: new InputField('text', require('../../assets/icons/email.svg'), 'E-mail', [ required, isEmail ]),
      password: new InputField('password', require('../../assets/icons/password.svg'), 'Password', [ required ]),
      confirmPassword: new InputField('password', require('../../assets/icons/password.svg'), 'Confirm password', [ required ])
    }
  },
  components: {
    'input-field': InputFieldComponent
  },
  methods: {
    register() {
      
    }
  }
}
</script>

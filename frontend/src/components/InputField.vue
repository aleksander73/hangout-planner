<template>
  <div class="input-field-container">
    <div class="icon-container">
      <img class="icon" :src=model.icon>
    </div>
    <div class="input-container">
      <input :type=model.inputType :placeholder=model.placeholder v-model.trim=model.value @blur=validate />
    </div>
    <span>{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.input-field-container {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  height: 50px;
  justify-content: flex-start;
  width: 350px;
}

.icon-container {
  align-items: center;
  background-color: rgb(220, 220, 220);
  border-radius: 4px 0px 0px 4px;
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  width: 15%;
}

.icon {
  height: 50%;
}

.input-container {
  display: flex;
  justify-content: center;
  width: 85%;
}

input {
  border: 0;
  outline: none;
  font-size: 1.25em;
  width: 90%;
}
</style>

<script>
import { InputField } from '../views/utility';

export default {
  data() {
    return {
      errorMessage: ''
    }
  },
  props: {
    model: {
      type: InputField,
      required: true
    }
  },
  methods: {
    async validate() {
      try {
        await this.model.validate();
        this.errorMessage = '';
      } catch(error) {
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

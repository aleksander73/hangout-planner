<template>
  <div class="container">
    <div :class="in_validClassList('input-field-container')">
      <div :class="in_validClassList('icon-container')">
        <img class="icon" :src=model.icon>
      </div>
      <div class="input-container">
        <input :type=model.inputType :placeholder=model.placeholder v-model.trim=model.value @input=validate />
      </div>
    </div>
    <div class="error-container">
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 350px;
}

.input-field-container {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  height: 50px;
  justify-content: flex-start;
  transition: border-color 0.35s ease;
}

.input-field-container-valid {
  border-color: green;
}

.input-field-container-invalid {
  border-color: red;
}

.icon-container {
  align-items: center;
  background-color: rgb(220, 220, 220);
  border-radius: 4px 0px 0px 4px;
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  width: 15%;
  transition: background-color 0.35s ease, border-color 0.35s ease;
}

.icon-container-valid {
  background-color: rgb(111, 231, 111);
  border-right-color: green;
}

.icon-container-invalid {
  background-color: rgb(255, 67, 67);
  border-right-color: red;
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

.error-container {
  display: flex;
  justify-content: center;
}

.error-container > span {
  color: red;
  margin: 0.5em 0;
}
</style>

<script>
import { InputField } from '../views/utility';

export default {
  data() {
    return {
      valid: undefined,
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
    in_validClassList(base) {
      let dynamicClasses = '';
      if(this.valid !== undefined) {
        const prefix = this.valid ? '' : 'in';
        dynamicClasses += `${base}-${prefix}valid`; 
      }
      return `${base} ${dynamicClasses}`
    },
    async validate() {
      try {
        await this.model.validate();
        this.valid = true;
        this.errorMessage = '';
      } catch(error) {
        this.valid = false;
        this.errorMessage = error.message;
      }
    }
  }
}
</script>

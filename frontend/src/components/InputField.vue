<template>
  <div class="container">
    <div :class="inputFieldClass('input-field-container')">
      <div :class="iconClass('icon-container')">
        <img class="icon" :src=model.icon :title=model.placeholder>
      </div>
      <div class="input-container">
        <input :type=model.inputType :placeholder=model.placeholder.toLowerCase() v-model.trim=model.value @focus=onFocus @input=onInput @blur=onBlur />
      </div>
    </div>
    <div class="error-container">
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
}

.input-field-container {
  border: 1px solid black;
  border-radius: 0px;
  display: flex;
  height: 50px;
  justify-content: flex-start;
  transition: border-color 0.35s ease;
}

.input-field-container-valid {
  border-color: rgb(70, 205, 70);
}

.input-field-container-invalid {
  border-color: rgb(250, 50, 50);
}

.icon-container {
  align-items: center;
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  transition: background-color 0.25s ease, border-color 0.25s ease;
  width: 15%;
}

.icon-container-valid {
  background-color: rgb(70, 205, 70);
  border-right-color: rgb(70, 205, 70);
}

.icon-container-invalid {
  background-color: rgb(250, 50, 50);
  border-right-color: rgb(250, 50, 50);
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
  font-size: 1.1em;
  outline: none;
  width: 90%;
}

.shadow {
  box-shadow: 0 0 7px rgb(45, 165, 235);
}

.error-container {
  display: flex;
  height: 30px;
  justify-content: flex-end;
}

.error-container > span {
  color: red;
}
</style>

<script>
import { InputField } from '../views/utility';

export default {
  data() {
    return {
      focused: false,
      isValid: undefined,
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
    inputFieldClass(base) {
      const in_validClassList = this.in_validClassList(base);
      let shadow = this.focused ? 'shadow' : '';
      return `${in_validClassList} ${shadow}`;
    },
    iconClass(base) {
      return this.in_validClassList(base);
    },
    in_validClassList(base) {
      let dynamicClasses = '';
      if(this.isValid !== undefined) {
        const prefix = this.isValid ? '' : 'in';
        dynamicClasses += `${base}-${prefix}valid`; 
      }
      return `${base} ${dynamicClasses}`
    },
    onFocus() {
      this.focused = true;
    },
    onInput() {
      if(this.isValid !== undefined) {
        this.isValid = undefined;
        this.errorMessage = '';
      }
    },
    async onBlur() {
      this.focused = false;
      await this.validate();
      this.$emit('lostFocus', {
        id: this.model.id
      });
    },
    async validate() {
      const { isValid, errorMessage } = await this.model.validate();
      this.isValid = isValid;
      this.errorMessage = errorMessage;
      return isValid;
    }
  }
}
</script>

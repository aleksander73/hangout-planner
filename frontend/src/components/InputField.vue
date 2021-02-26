<template>
  <div class="input-field-container">
    <div class="icon-container">
      <img class="icon" :src=icon>
    </div>
    <div class="input-container">
      <input :type=inputType :placeholder=placeholder>
    </div>
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
  height: inherit;
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
export default {
  data() {
    return {
      inputType: '',
      icon: {}
    }
  },
  props: {
    tag: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    }
  },
  created() {
    let icon = this.$store.getters.getInputFieldByTag(this.tag);
    this.inputType = icon.inputType;
    this.icon = icon.icon;
  }
}
</script>

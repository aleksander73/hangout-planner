<template>
  <div>
    <authorization/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: rgb(230, 230, 230);
  font-family: 'Open Sans', sans-serif;
}

h1 {
  letter-spacing: 3px;
}

button {
  background-color: rgb(22, 142, 255);
  border: 0;
  color: white;
  cursor: pointer;
  font-size: 1.2em;
  height: 45px;
  margin-top: 20px;
  outline: none;
  transition: background-color 0.25s ease;
  width: 400px;
}

button:hover {
  background-color: rgb(0, 120, 233);
}
</style>

<script>
import { Authorization } from './components';

export default {
  components: {
    'authorization': Authorization
  }
}
</script>

<template>
  <div>
    <register/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

body {
  font-family: 'Open Sans', sans-serif;
}
</style>

<script>
import { Register } from './components';

export default {
  components: {
    'register': Register
  }
}
</script>

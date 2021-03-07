<template>
  <div class="header-container">
    <div class="left-container">
      <a href="/"><img src="../../assets/icons/coffee.svg" title="Home"></a>
    </div>
    <div v-if=!authenticating class="right-container">
      <div v-if=!user class="authorize-buttons">
        <a href="/login"><button>Log in</button></a>
        <a href="/register"><button>Register</button></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  height: 75px;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
}

.header-container > div {
  margin: 1em;
}

.left-container img {
  height: 100%;
}

.right-container a {
  margin-left: 1em;
}

.right-container a > button {
  background-color: rgb(255, 255, 65);
  color: black;
  padding: 10px 15px;
}

.authorize-buttons > a > button:hover {
  background-color: rgb(255, 255, 35);
}
</style>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
    authenticating() {
      let name = this.$route.name;
      return name === 'login' || name === 'register';
    }
  }
}
</script>

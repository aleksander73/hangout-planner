<template>
  <div class="home-container">
    <welcome v-if="userLoggedIn === false"/>
    <dashboard v-else-if="userLoggedIn === true"/>
  </div>
</template>

<style scoped>
</style>

<script>
import { Dashboard, Welcome } from '../components';
import apiClient from '../api/ApiClient';

export default {
  data() {
    return {
      userLoggedIn: undefined
    }
  },
  components: {
    'dashboard': Dashboard,
    'welcome': Welcome
  },
  async created() {
    const user = await apiClient.whoami();
    this.userLoggedIn = Boolean(user);
    if(this.userLoggedIn) {
      this.$store.commit('setUser', user);
    }
  }
}
</script>

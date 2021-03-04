<template>
  <div>
    <div v-if="userLoggedIn === false">
      <welcome/>
    </div>
    <div v-else-if="userLoggedIn === true">
      <dashboard/>
    </div>
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

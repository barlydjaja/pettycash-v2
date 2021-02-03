<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <router-link :to="{ name: 'Login' }"></router-link>
    <router-link :to="{ name: 'Transaction' }"></router-link>
    <!-- </div> -->
    <!-- <div class="app-nav"> -->
    <NavBar v-if="isShowNav" />
    <!-- </div> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/nav-bar";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    isShowNav() {
      return !(this.$route.name === "Login");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/function";
@import "@/assets/scss/partials/reset";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>

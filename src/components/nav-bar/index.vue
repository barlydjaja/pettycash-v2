<template>
  <section class="navbar">
    <div
      :class="{
        'navbar-left': true,
        'navbar-left-padding': $store.state.menu.isLock,
      }"
    ></div>
  </section>
</template>

<script>
export default {
  name: "nav-bar",
};
</script>

<style lang="scss" scoped>
// @import "index";
</style>
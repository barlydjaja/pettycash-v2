<template>
  <section class="navbar">
    <!-- <p>hello world</p> -->
    <div
      :class="{
        'navbar-left': true,
        'navbar-left-padding': true, // nanti diganti ke store
      }"
    >
      <!-- menu button -->
      <div
        class="nav_menu"
        v-show="!$route.meta.showLogo"
        @click="toggleMenuShow(true)"
      >
        <!-- <a href="#"></a> -->
      </div>
      <!-- show logo -->
      <div class="detail_page_logo" v-show="$route.meta.showLogo"></div>
      <!-- show page title -->
      <div class="nav_page_title">{{ $route.meta.title }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "nav-bar",
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
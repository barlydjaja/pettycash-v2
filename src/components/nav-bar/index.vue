<template>
  <section class="navbar">
    <!-- <p>hello world</p> -->
    <div
      :class="{
        'navbar-left': true,
        'navbar-left-padding': $store.state.menu.isLock, // nanti diganti ke store
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
    <div class="navbar-right" v-if="user && showMenu">
      <div class="language">
        <a href="#">ID</a>
        <div class="language_list_card">
          <i class="language_list_icon el-icon-caret-top"></i>
          <ul class="language_list">
            <li><a href="#">EN</a></li>
          </ul>
        </div>
      </div>
      <div class="user_info">
        <a href="#"
          >{{ user.role.roleName }} <i class="el-icon-caret-bottom"></i
        ></a>
        <div class="user_operation_card">
          <i class="user_operation_icon el-icon-caret-top"></i>
          <ul class="user_operation_list">
            <li @click="handleLogout"><a href="#" class="logout">LOGOUT</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import storage from "@/libs/storage";
export default {
  name: "nav-bar",
  data() {
    return {
      user: storage.get("user"),
    };
  },
  computed: {
    showMenu() {
      const { $route } = this;
      return $route.name !== "Login";
    },
  },
  methods: {
    handleLogout() {
      console.log("logout");
      storage.removeAll();
      // this.$router.push("/");
    },
    toggleMenuShow(show) {
      this.$store.commit("toggleMenuShow", show);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>

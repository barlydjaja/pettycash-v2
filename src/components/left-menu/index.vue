//FIXME: masukin @click di bagian div>class="hide_menu"

<template>
  <aside class="left_menu">
    <!-- input toolbar -->
    <div class="toolbar">
      <div
        @click="lockMenu"
        :class="{
          lock_menu: true,
          lock_menu_lock: !isLock,
          lock_menu_unLock: isLock,
        }"
      ></div>
      <div
        v-show="!isLock"
        class="hide_menu"
        @click="$store.state.menu.show = false"
      ></div>
    </div>

    <!-- input logo  -->
    <div class="system_logo_name">
      <div class="system_logo"></div>
      <div class="system_name">Sistem Pengelolaan Petty Cash PinjamanGO</div>
    </div>

    <!-- Menu Start -->
    <div class="menu_panel">
      <el-menu
        :default-active="currentActive"
        background-color="#3a4954"
        text-color="#fff"
        active-text-color="#64cd9d"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>Profile</span>
          </template>
          <el-menu-item index="1-1" @click="goTo('UserInfo', '1-1')"
            >Profil User</el-menu-item
          >
          <el-menu-item index="1-2" @click="goTo('UsersList', '1-2')"
            >Users List</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-money"></i>
            <span>PettyCash</span>
          </template>
          <el-menu-item index="2-1" @click="goTo('TransactionHistory', '2-1')"
            >Transaction</el-menu-item
          >
          <el-menu-item index="2-2" @click="goTo('Approval', '2-2')"
            >Approval</el-menu-item
          >
          <el-menu-item index="2-3" @click="goTo('Edited', '2-3')"
            >Edited</el-menu-item
          >
          <el-menu-item index="2-4" @click="goTo('Deleted', '2-4')"
            >Deleted</el-menu-item
          >
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>Inventory</span>
          </template>
          <el-menu-item index="3-1" @click="goTo('TransactionHistory', '3-1')"
            >Transaction</el-menu-item
          >
          <el-menu-item index="3-2" @click="goTo('Approval', '3-2')"
            >Approval</el-menu-item
          >
          <el-menu-item index="3-3" @click="goTo('Edited', '3-3')"
            >Edited</el-menu-item
          >
          <el-menu-item index="3-4" @click="goTo('Deleted', '3-4')"
            >Deleted</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
import storage from "@/libs/storage";
export default {
  name: "left-menu",
  data() {
    return {
      isLock: false,
      user: storage.get("user"),
    };
  },
  computed: {
    currentActive() {
      return this.$store.state.menu.leftMenuActiveIndex;
    },
  },
  methods: {
    goTo(menu, activeIndex) {
      this.$store.state.menu.leftMenuActiveIndex = activeIndex;
      // console.log(this.$route.path);
      this.$router.push({ name: menu });
    },
    lockMenu() {
      this.isLock = !this.isLock;
      this.$store.state.menu.isLock = this.isLock;
      storage.set("lockMenu", this.islock);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
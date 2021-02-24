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
      <ul class="menu">
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'UserInfo' }"
            class="menu_icon menu_icon_user"
            :class="{ active: false }"
            >Profil User</router-link
          >
        </li>
        <li v-if="user.userId === 1">
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'UsersList' }"
            class="menu_icon menu_icon_user"
            :class="{ active: false }"
            >Users List
          </router-link>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'TransactionHistory' }"
            class="menu_icon menu_other"
            :class="{ active: false }"
          >
            Transaksi
          </router-link>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'Approval' }"
            class="menu_icon menu_other"
            :class="{ active: false }"
          >
            Approval
          </router-link>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'Edited' }"
            class="menu_icon menu_other"
            :class="{ active: false }"
          >
            Edited
          </router-link>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <router-link
            :to="{ name: 'Deleted' }"
            class="menu_icon menu_other"
            :class="{ active: false }"
          >
            Deleted
          </router-link>
        </li>
      </ul>
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
  methods: {
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
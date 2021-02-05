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
      <div v-show="!isLock" class="hide_menu"></div>
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
            :to="{ name: 'Login' }"
            class="menu_icon menu_icon_user"
            :class="{ active: false }"
            >Profil User</router-link
          >
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <a
            @click.stop.prevent="goTo(menuFirst)"
            :class="{ active: false }"
            class="menu_icon menu_other"
            href="javascript:void(0)"
            >Transaksi
          </a>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <a
            @click.stop.prevent="goTo(menuFirst)"
            :class="{ active: false }"
            class="menu_icon menu_other"
            href="javascript:void(0)"
            >Approval
          </a>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <a
            @click.stop.prevent="goTo(menuFirst)"
            :class="{ active: false }"
            class="menu_icon menu_other"
            href="javascript:void(0)"
            >Edited
          </a>
        </li>
        <li>
          <!-- FIXME: bind class active diubah dinamis -->
          <a
            @click.stop.prevent="goTo(menuFirst)"
            :class="{ active: false }"
            class="menu_icon menu_other"
            href="javascript:void(0)"
            >Deleted
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: "left-menu",
  data() {
    return {
      isLock: false,
    };
  },
  methods: {
    lockMenu() {
      this.isLock = !this.isLock;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "index";
</style>
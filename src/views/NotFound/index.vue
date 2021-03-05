<template>
  <div class="page page-conf">
    <el-scrollbar
      v-show="isShowMenu || $store.state.menu.isLock"
      class="page-menu"
      wrap-class="page_menu_wrap"
    >
      <LeftMenu />
    </el-scrollbar>
    <div
      @click="hideMenu"
      class="page-main"
      id="page_main"
      :class="{
        'page-main': true,
        'page-main-padding': $store.state.menu.isLock,
      }"
    >
      <div class="notFound_container">
        <div style="display: block">
          <h1>Page Not Found</h1>
          <router-link :to="{ name: 'Home' }">Back To Homepage</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/left-menu";

export default {
  name: "NotFound",
  components: {
    LeftMenu,
  },
  computed: {
    isShowMenu() {
      return this.$store.state.menu.show;
    },
  },
  methods: {
    hideMenu() {
      this.$store.commit("toggleMenuShow", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";

.txt_red {
  color: #f00;
}
.page_menu_wrap {
  overflow: auto;
}

.page-conf {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
.page-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 320px;
  height: 100%;
  /*width: 300px;*/
  background-color: $navMenuBgColor;
  /*overflow: hidden;*/
  flex-shrink: 0;
  z-index: 20;
  /*overflow: auto;*/
  overflow-x: hidden;
  overflow-y: auto;
}

.page-main {
  flex: 1;
  /*overflow: auto;*/
  /*padding: 15px;*/
  padding: 0;
  /*background-color: #f3f3f3;*/
  overflow-y: auto;
  overflow-x: hidden;
}
.page-main-padding {
  padding-left: 320px;
}
.notFound_container {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
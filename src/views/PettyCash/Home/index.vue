<template>
  <div>
    <div class="page page-conf">
      <h1>this is the landing page of petty cash</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "PettyCashLandingPage",
  components: {},
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
  background-color: $navMenuBgColor;
  flex-shrink: 0;
  z-index: 20;
  overflow-x: hidden;
  overflow-y: auto;
}

.page-main {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.page-main-padding {
  padding-left: 320px;
}
</style>
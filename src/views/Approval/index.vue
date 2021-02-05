<template>
  <div>
    <el-scrollbar v-show="true" class="page-menu" wrap-class="page_menu_wrap">
      <LeftMenu />
    </el-scrollbar>
    <h1>this will be the approval page</h1>
  </div>
</template>

<script>
import LeftMenu from "@/components/left-menu";
export default {
  name: "Approval",
  components: {
    LeftMenu,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";

.page_menu_wrap {
  overflow: auto;
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
</style>
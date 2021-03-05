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
      <el-row :gutter="20">
        <el-col :span="14" :offset="5">
          <div class="grid-content bg-purple">
            <el-button
              id="petty-cash"
              icon="el-icon-money"
              class="button_size"
            ></el-button>
            <el-button
              id="inventory"
              icon="el-icon-s-home"
              class="button_size"
            ></el-button>
          </div>
        </el-col>
        <el-col :span="14" :offset="5">
          <div class="grid-content">
            <div>
              <label for="petty-cash">
                <strong> Petty Cash </strong>
              </label>
            </div>
            <div>
              <label for="inventory">
                <strong> Inventory </strong>
              </label>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/left-menu";

export default {
  name: "Home",
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

.el-button:focus,
.el-button:hover {
  color: #64cd9d;
}

.button_size {
  width: 300px;
  min-height: 20px;
  max-height: 200px;
  font-size: 150px;
}

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
.el-row {
  margin-top: 20vh;
  transform: translateY(-10vh);
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

// .bg-purple {
//   background: #d3dce6;
// }

.grid-content {
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  min-height: 100px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
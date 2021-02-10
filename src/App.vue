<template>
  <div id="app">
    <div class="app-nav">
      <NavBar v-if="isShowNav" />
    </div>
    <!-- </div> -->
    <router-link :to="{ name: 'TransactionHistory' }">sejarah sini</router-link>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import NavBar from "@/components/nav-bar";
// import LeftMenu from "@/components/left-menu";

export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
    };
  },
  components: {
    NavBar,
    // LeftMenu,
  },
  computed: {
    isShowNav() {
      return !(this.$route.name === "Login");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/function";
@import "@/assets/scss/partials/reset";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.search_panel_form {
  padding: 16px;
  .el-col {
    padding: 0 15px;
  }
  .search_panel_btn {
    // margin-top: 40px;
    margin-top: 34px;
  }
  .search_panel_no_label .el-form-item__label {
    opacity: 0;
  }
  .search_panel_date {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .time_date_contact {
    height: 1px;
    background-color: $colorText;
    display: inline-block;
    width: 10px;
    line-height: 0;
    color: transparent;
  }
  .search_panel_center_text {
    text-align: center;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item__label {
    line-height: 30px;
  }
  .el-form--label-top .el-form-item__label {
    padding-bottom: 5px;
  }
}

.data_table_panel {
  padding: 16px;
  background-color: #fff;
  flex: 1;
  overflow: auto;
}
</style>

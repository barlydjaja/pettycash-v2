<!--suppress ALL -->
<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" label-position="top">
        <el-row>
          <el-col :span="16">
            <!--            adding new mutation-->
            <AddNewMutation/>
          </el-col>
          <el-col :span="8" >
<!--            <el-form-item prop="search">-->
<!--              <el-input></el-input>-->
<!--            </el-form-item>-->
            <el-form-item prop="search" style="display: inline-block; margin-bottom: 0">
              <el-input placeholder="search" v-model="search" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <!--            testing tag to check search-->
<!--            <p>{{ search }}</p>-->
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data_table_panel">
      <el-tabs type="border-card" style="text-align: center">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>Barang Masuk</span>
          Route
        </el-tab-pane>
        <el-tab-pane label="Barang Transfer">Barang Transfer</el-tab-pane>
        <el-tab-pane label="Barang Keluar">Barang Keluar</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AddNewMutation from "@/components/Inventory/AddNewMutation"
import storage from "@/libs/storage"

export default {
  name: "ItemMutation",
  components: {
    AddNewMutation,
  },
  data() {
    return {
      form: {},
      search: "",
      user: null
    }
  },
  created() {
    this.user = storage.get('user')
  }
};
</script>

<style lang="scss" scoped>
</style>

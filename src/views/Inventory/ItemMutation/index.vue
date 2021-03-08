<template>
  <div class="transaction">
    <div class="data_table_panel">
      <el-tabs type="border-card" style="text-align: center">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> Route</span>
          Route
        </el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMutation",
};
</script>

<style lang="scss" scoped>
</style>

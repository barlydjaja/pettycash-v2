<template>
  <div style="display: inline-block; margin-right: 20px">
    <div>
    <el-button @click="dialogTransaction = true">this button is to add transaction in inventory</el-button>
    </div>
    <el-dialog title="Dialog to add transaction" :visible.sync="dialogTransaction">
      <p>disini bakal ada form yg disi untuk item keluar/masuk</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click ="dialogVisible = false">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddNewTransactionInventory",
  data(){
    return{
      dialogTransaction: false
    }
  }
}
</script>

<style scoped>

</style>

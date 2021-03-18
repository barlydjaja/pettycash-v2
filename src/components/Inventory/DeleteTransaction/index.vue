<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-tooltip class="item" effect="dark" content="Delete Transaction" placement="top" :hide-after="2000">
      <el-button @click="dialogVisible=true" icon="el-icon-delete" size="mini"></el-button>
    </el-tooltip>
    <el-dialog :visible.sync="dialogVisible" title="warning" center>
      <p style="text-align: center"> This will delete the Transaction with Invoice Number: <strong>{{invoiceNumber}}</strong>. Are you sure?</p>
      <span slot="footer">
        <el-button @click="dialogVisible=false">Cancel</el-button>
        <el-button @click="handleDelete" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "DeleteTransactionInventory",
  props: {
    inventoryOrderId: Number,
    invoiceNumber: String,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handleDelete() {
      console.log(this.inventoryOrderId)
      InventoryService.deleteInventoryOrder(this.inventoryOrderId)
          .then(res => {
            console.log(res)
            this.$emit('delete-transaction-success')
          })
          .catch(err => console.error('error at deleting transaction', err))
      this.dialogVisible=false
    }
  }
}
</script>

<style scoped>

</style>

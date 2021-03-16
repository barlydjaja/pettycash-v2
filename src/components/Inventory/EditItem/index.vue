<template>
  <div style="display:inline-block; margin-right: 10px">
    <el-button size="mini" icon="el-icon-edit" @click="dialogVisible=true"></el-button>
    <el-dialog title="Edit Item Info" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="Description">
          <el-input type="textarea" :model="form.description"></el-input>
        </el-form-item>

        <el-card>
          <pre>{{form}}</pre>
        </el-card>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditItem",
  props: {
    itemDetail: Object,
  },
  data() {
    const {description, inventoryOrder, itemId} = this.itemDetail
    return {
      dialogVisible: false,
      form: {
        description,
        from: inventoryOrder.to || inventoryOrder.from,
        inventoryOrderId: inventoryOrder.inventoryOrderId,
        invoiceDate: inventoryOrder.invoiceDate.split(" ").join("T"),
        invoiceNumber: inventoryOrder.invoiceNumber,
        itemId: [
          itemId
        ],
        jurnalNumber: inventoryOrder.jurnalNumber,
        statusTransactionId: 2,
        to: "",
        userId: inventoryOrder.user.userId,
        vendorId: inventoryOrder.vendor.vendorId
      }
    }
  },
}
</script>

<style scoped>

</style>

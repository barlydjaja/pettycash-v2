<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-button icon="el-icon-truck" @click="dialogVisible=true" size="mini">
    </el-button>
    <el-dialog title="Transfer Item To Other Branches" :visible.sync="dialogVisible">
      <p>Detail Item</p>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.from" disabled></el-input>
          <i class="el-icon-right"></i>
          <el-select v-model="form.to">
            <el-option label="Jakarta" value="JAKARTA"></el-option>
            <el-option label="Semarang" value="SEMARANG"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleTransferItem" type="primary">Confirm</el-button>
          <el-button @click="dialogVisible=false">Cancel</el-button>
        </el-form-item>
        <el-card>
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "TransferItem",
  props: {
    itemDetail: Object,
  },
  data() {
    const {description, inventoryOrder, itemId} = this.itemDetail
    return {
      dialogVisible: false,
      form: {
        description,
        from: inventoryOrder.to|| inventoryOrder.from,
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
  methods: {
    handleTransferItem() {
      let body = this.form
      InventoryService.addInventoryOrder(body).then(res => console.log(res)).catch(err => console.error("error when transfering data", err.response))
    }
  },
}
</script>

<style scoped>

.el-icon-right {
  font-size: 2em;
  vertical-align: middle;
}

.el-input {
  width: auto;
}

</style>

<template>
  <div style="display:inline-block; margin-right: 10px">
    <el-tooltip class="item" effect="dark" content="Edit Transaction" placement="top" :hide-after="2000">
    <el-button size="mini" icon="el-icon-edit"
               @click="
               dialogVisible=true;
               getAllVendor();
               getAllItemById()"
    >
    </el-button>
    </el-tooltip>
    <el-dialog title="Edit Item Info" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-position="top">
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description" :value="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Invoice Date">
          <el-date-picker v-model="form.invoiceDate" placeholder="Transaction Date"></el-date-picker>
        </el-form-item>
        <el-form-item label="Invoice Number">
          <el-input v-model="form.invoiceNumber"></el-input>
        </el-form-item>
        <el-form-item label="Journal Number">
          <el-input v-model="form.jurnalNumber"></el-input>
        </el-form-item>
        <el-form-item label="Vendor">
          <el-select v-model="form.vendorId" placeholder="Pilih Vendor" filterable>
            <el-option v-for="vendor in vendors" :key="vendor.vendorId" :label="vendor.vendorName"
                       :value="vendor.vendorId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleEdit" type="primary">Confirm</el-button>
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
  name: "EditItem",
  props: {
    itemDetail: Object,
  },
  data() {
    const {
      description,
      to, from, inventoryOrderId, invoiceDate, invoiceNumber, user, vendor, jurnalNumber,
    } = this.itemDetail
    return {
      dialogVisible: false,
      vendors: "",
      form: {
        description,
        from: to || from,
        inventoryOrderId: inventoryOrderId,
        invoiceDate: invoiceDate.split(" ").join("T"),
        invoiceNumber: invoiceNumber,
        itemId: [],
        jurnalNumber: jurnalNumber,
        statusTransactionId: 2,
        to: "",
        userId: user.userId,
        vendorId: vendor.vendorId
      }
    }
  },
  methods: {
    getAllVendor() {
      InventoryService.getAllVendor().then(res => this.vendors = res.data).catch(err => console.error('error at get all vendor in edit item ', err))
    },
    getAllItemById() {
      let inventoryOrderId = this.itemDetail.inventoryOrderId
      InventoryService.getAllItemById(inventoryOrderId).then(res => {
        this.form.itemId = res.data.map(data=>data.itemId)
      })
    },
    handleEdit() {
      let body = this.form
      InventoryService.updateInventoryOrder(body).then(res => {
        console.log(res)
        this.$emit('edit-success')
        this.dialogVisible = false
      })
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-tooltip class="item" effect="dark" content="Transfer Mass Item" placement="top" :hide-after="2000">
      <el-button icon="el-icon-truck" @click="dialogVisible=true; getAllItemById()" size="mini">
      </el-button>
    </el-tooltip>
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
          <el-card>
            <p>
              Invoice Number: {{ form.invoiceNumber }}
            </p>
            <p>
              Invoice Date: {{ form.invoiceDate.split("T")[0] }}
            </p>
            <p>
              Journal number {{ form.invoiceNumber }}
            </p>
            <p>
              Transaction Description : {{ form.description }}
            </p>
            <p>
              Daftar Barang yang akan di transfer :
            </p>
              <el-row :gutter="10">
                <el-col :span="12" v-for="(item, index) in itemList" :key="item.itemId">
                  <span style="margin-left: 20px"><strong>{{ index + 1 }}.</strong> {{ item.serialNumberItem }} -
                    {{ item.itemName }}
                  </span>
                </el-col>
              </el-row>
          </el-card>
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
    const {
      description,
      to,
      from,
      inventoryOrderId,
      invoiceDate,
      invoiceNumber,
      jurnalNumber,
      user,
      vendor,
    } = this.itemDetail
    return {
      dialogVisible: false,
      itemList: [],
      form: {
        description,
        from: to || from,
        inventoryOrderId,
        invoiceDate: invoiceDate.split(" ").join("T"),
        invoiceNumber,
        itemId: [],
        jurnalNumber,
        statusTransactionId: 2,
        to: "",
        userId: user.userId,
        vendorId: vendor.vendorId
      }
    }
  },
  methods: {
    handleTransferItem() {
      console.log(this.itemDetail)
      let body = this.form
      InventoryService.updateInventoryOrder(body)
          .then(res => {
            console.log(res)
            this.$emit('transfer-item-success')
          })
          .catch(err => console.error("error when transfering data", err.response))
      this.dialogVisible = false
    },
    getAllItemById() {
      let inventoryOrderId = this.itemDetail.inventoryOrderId
      InventoryService.getAllItemById(inventoryOrderId).then(res => {
        console.log(res.data)
        this.itemList = res.data
        this.form.itemId = res.data.map(data => data.itemId)
      })
    },
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

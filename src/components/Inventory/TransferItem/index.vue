<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-tooltip v-if="tooltipContent" class="item" effect="dark" :content="tooltipContent" placement="top"
                :hide-after="2000">
      <el-button :type="type" :icon="icon" @click="dialogVisible=true; getAllItemById()" :size="buttonSize">
        {{ buttonText }}
      </el-button>
    </el-tooltip>
    <el-button v-else :type="type" :icon="icon" @click="dialogVisible=true; getAllItemById()" :size="buttonSize">
      {{ buttonText }}
    </el-button>
    <el-dialog title="Transfer Item To Other Branches" :visible.sync="dialogVisible" append-to-body>
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
        <el-form-item label="Invoice Number">
          <el-input v-model="form.invoiceNumber"></el-input>
        </el-form-item>
        <el-form-item label="Journal Number">
          <el-input v-model="form.jurnalNumber"></el-input>
        </el-form-item>
        <el-form-item label="InvoiceDate">
          <el-date-picker v-model="form.invoiceDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-card>
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
    selectedItem: Object,
    icon: String,
    type: String,
    buttonText: String,
    buttonSize: String,
    tooltipContent: String,
  },
  data() {
    const {
      description,
      to,
      from,
      invoiceNumber,
      jurnalNumber,
      user,
      vendor,
    } = this.itemDetail
    return {
      dialogVisible: false,
      itemRemainingInSelectedRow:null,
      itemList: [],
      form: {
        description,
        from: to || from,
        invoiceDate: null,
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
      console.log('itemDetail', this.itemDetail)
      let body = this.form
      InventoryService.addInventoryOrder(body)
          .then(res => {
            console.log("new inventory order", res)
            this.getItemAfterTransfer()

          })
          .catch(err => console.error("error when transfering data", err.response))
      this.dialogVisible = false
    },
    deleteInventoryOrder() {
      const inventoryOrderId = this.itemDetail.inventoryOrderId
      InventoryService.deleteInventoryOrder(inventoryOrderId)
          .then(res => {
            console.log('transaction deleted...', res)
            this.$emit('transfer-item-success')
          })
          .catch(err => console.error('delete transaction after no more item', err.response))
    },
    getItemAfterTransfer(){
      let inventoryOrderId = this.itemDetail.inventoryOrderId
      InventoryService.getAllItemById(inventoryOrderId).then(res=> {
        this.itemRemainingInSelectedRow = res.data.length
        console.log('item left at selected row:', this.itemRemainingInSelectedRow)
        if (!this.itemRemainingInSelectedRow) {
          console.log('deleting order because no more item')
          this.deleteInventoryOrder()
        } else {
          this.$emit('transfer-item-success')
          this.$emit('transfered-item-id',this.selectedItem.itemId)
        }
      }).catch(err=>console.error('get-item-after-transfer',err.response))
    },
    getAllItemById() {
      let inventoryOrderId = this.itemDetail.inventoryOrderId
      if (this.selectedItem) {
        if (!this.itemList.find(currentItem => currentItem.id === this.selectedItem.Id)) {
          this.form.itemId.push(this.selectedItem.itemId)
          this.itemList.push(this.selectedItem)
        }
      } else {
        InventoryService.getAllItemById(inventoryOrderId).then(res => {
          console.log('getting all item by id', res.data)
          this.itemList = res.data
          this.form.itemId = res.data.map(data => data.itemId)
        })
      }
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

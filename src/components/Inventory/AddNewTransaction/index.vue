<template>
  <div style="display: inline-block; margin-right: 20px">
    <div>
      <el-button @click="
        dialogTransactionUpdate();
        getAllVendor();
      ">Add Inventory
      </el-button>
    </div>
    <el-dialog title="New Inventory Order/Transaction" :visible.sync="dialogTransaction">
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <el-form-item label="Invoice" prop="invoiceNumber">
          <el-row>
            <el-col :xl="6">
              <el-date-picker
                  v-model="form.invoiceDate"
                  type="date"
                  placeholder="Invoice Date">
              </el-date-picker>
            </el-col>
            <el-col :xl="18">
              <el-input v-model="form.invoiceNumber" placeholder="Invoice Number"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Journal Number" prop="jurnalNumber">
          <el-input v-model="form.jurnalNumber"></el-input>
        </el-form-item>
        <el-form-item prop="vendorId">
          <span>
            Vendor's Name
          </span>
          <span>
            <AddNewVendor v-on:new-vendor-added="getAllVendor"/>
          </span>
          <el-select v-model="form.vendorId" filterable placeholder="select vendor">
            <el-option v-for="vendor in vendorList"
                       :key="vendor.vendorId"
                       :label="vendor.vendorName"
                       :value="vendor.vendorId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <AddNewItem button-type="text"/>
          <div class="item-list" v-for="item in createdItemList" :key="item.itemId">
            <el-button size="mini" plain>{{ item.serialNumberItem }} -
              {{ item.category.categoryName }} -
              {{ item.itemName }} <i @click="onDeleteItem(item.itemId)" class="el-icon-close" v-show="!isLoading"></i>
              <i class="el-icon-loading" v-show="isLoading"></i>
            </el-button>
          </div>
        </el-form-item>
        <el-card>
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleCloseDialog">Cancel</el-button>
    <el-button type="primary" @click="handleFormSubmit('ruleForm')">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";
import AddNewItem from "@/components/Inventory/AddNewItem"
import storage from "@/libs/storage"
import AddNewVendor from "@/components/Inventory/AddNewVendor"

export default {
  name: "AddNewTransactionInventory",
  components: {
    AddNewItem,
    AddNewVendor,
  },
  data() {
    return {
      isLoading: false,
      dialogTransaction: false,
      createdItemList: this.$store.state.item.newItemCreated,
      vendorList: [],
      vendorName: "",
      form: {
        itemId: this.$store.state.item.newItemId,
        statusTransactionId: 1,
        from: storage.get('user').branch.branchName,
        userId: storage.get('user').userId
      },
      rules: {
        invoiceNumber: [
          {required: true, message: 'Input Invoice Date & Number', trigger: 'change'}
        ],
        jurnalNumber: [
          {required: true, message: 'Input Journal Number', trigger: 'blur'}
        ],
        description: [
          {required: true, message: 'Input Description for this transaction', trigger: 'blur'}
        ],
        vendorId:[
          {required: true, message: 'Please Choose/Add vendor', trigger:'change'}
        ]
      }
    }
  },
  methods: {
    dialogTransactionUpdate() {
      this.dialogTransaction = !this.dialogTransaction
    },
    getAllVendor() {
      console.log('getting vendor list...')
      InventoryService.getAllVendor().then(res => {
        console.log(res)
        this.vendorList = res.data
      }).catch(err => console.log(err))
    },
    handleFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
      let body = this.form
      InventoryService.addInventoryOrder(body)
          .then(res => {
            console.log(res)
            this.dialogTransaction = false
            this.$emit('new-transaction-created')
          })
          .catch(err => console.error('handleFormSubmit', err))
        } else{
          return false
        }
      })
    },
    onDeleteItem(itemId) {
      this.isLoading = true
      console.log(itemId)
      InventoryService.deleteItem(itemId)
          .then(res => {
            console.log(res)
            const selectedItemIndex = this.createdItemList.map(item => item.itemId).indexOf(itemId)
            const selectedIdIndex = this.form.itemId.indexOf(itemId)
            this.$store.commit("deleteSelectedItem", selectedItemIndex)
            this.$store.commit("deleteSelectedId", selectedIdIndex)
          })
          .catch(err => console.error('onDeleteItem', err))
      this.isLoading = false
    },
    handleCloseDialog() {
      this.vendorList = []
      this.dialogTransaction = false
    },
    massDelete() {
      let body = this.form.itemId
      InventoryService.deleteAllItem(body).then(res => {
        console.log(res)
      }).catch(err => console.error('error on mass delete', err.response))
    },
  },
}
</script>

<style scoped>

.item-list {
  line-height: 20px;
}

.el-date-editor.el-input {
  width: 100%
}


</style>

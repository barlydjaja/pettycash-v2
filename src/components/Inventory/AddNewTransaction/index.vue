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
      <el-form ref="form" :model="form">
        <el-form-item label="Invoice">
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
        <el-form-item label="Journal Number">
          <el-input v-model="form.jurnalNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <span>
            Vendor's Name
          </span>
          <span>
            <AddNewVendor/>
          </span>
          <el-autocomplete v-model="vendorName" :fetch-suggestions="querySearchVendor" placeholder="Vendor"
                           @select="setVendorId"></el-autocomplete>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <AddNewItem/>
          <div class="item-list" v-for="item in createdItemList" :key="item.itemId">
            <el-button size="mini" plain>{{ item.serialNumberItem }} -
              {{ item.category.categoryName }} -
              {{ item.itemName }} <i @click="onDeleteItem" class="el-icon-close"></i> <i class="el-icon-loading"></i>
            </el-button>
          </div>
        </el-form-item>
        <el-card>
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleCloseDialog">Cancel</el-button>
    <el-button type="primary" @click="handleFormSubmit">Confirm</el-button>
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
      itemList: [],
      vendorList: [],
      vendorName: "",
      form: {
        itemId: this.$store.state.item.newItemId,
        statusTransactionId: 1,
        from: storage.get('user').branch.branchName,
        userId: storage.get('user').userId
      },
    }
  },
  computed: {
    createdItemList() {
      return this.$store.state.item.newItemCreated
    },
  },
  methods: {
    dialogTransactionUpdate() {
      this.dialogTransaction = !this.dialogTransaction
    },
    getAllVendor() {
      console.log('getting vendor list...')
      InventoryService.getAllVendor().then(res => {
        console.log(res)
        for (let vendor of res.data) {
          this.vendorList.push({value: vendor.vendorName, vendorId: vendor.vendorId})
        }
      }).catch(err => console.log(err))
    },
    querySearchVendor(queryString, cb) {
      let links = this.vendorList
      let results = queryString ? links.filter(this.createFilterVendor(queryString)) : links

      cb(results)
    },
    createFilterVendor(queryString) {
      return link => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    setVendorId(vendor) {
      this.form.vendorId = vendor.vendorId
    },
    handleFormSubmit() {
      let body = this.form
      InventoryService.addInventoryOrder(body).then(res => {
        console.log(res)
      }).catch(err => console.error('something not right ', err))
    },
    onDeleteItem() {
      this.isLoading = false
      setTimeout(function () {
        this.isLoading = false
        console.log('ItemDeleted')
      }, 2000)
    },
    handleCloseDialog() {
      this.vendorList = []
      this.dialogTransaction = false
    },
    massDelete() {
      let body = this.$store.state.item.newItemId
      InventoryService.deleteAllItem(body).then(res => {
        console.log(res)
      }).catch(err => console.error('error on mass delete', err))
    },
    // handleClosePage() {
    //   this.massDelete()
    // },
  },
  // created() {
  //   window.addEventListener('beforeunload', this.handleClosePage)
  // }
}
</script>

<style scoped>

.item-list {
  line-height: 20px;
}

.el-date-editor.el-input {
  width: 100%
}

.el-autocomplete {
  display: block
}

</style>

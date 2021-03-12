<template>
  <div style="display: inline-block; margin-right: 20px">
    <div>
      <el-button @click="
        dialogTransactionUpdate();
        getAllVendor();
        getAllItem();
      ">Add Inventory
      </el-button>
    </div>
    <el-dialog title="New Inventory Order/Transaction" :visible.sync="dialogTransaction">
      <el-form ref="form" :model="form">
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Branch">
          <el-select v-model="form.from" placeholder="Cabang">
            <el-option label="JAKARTA" value="JAKARTA"></el-option>
            <el-option label="SEMARANG" value="SEMARANG"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Invoice Number">
          <el-input v-model="form.invoiceNumber"></el-input>
        </el-form-item>
        <el-form-item label="Item">
          <el-autocomplete
              v-model="itemName"
              :fetch-suggestions="querySearchAsync"
              placeholder="Please input"
              @select="handleSelect"
          ></el-autocomplete>
          <el-button type="primary" icon="el-icon-plus" plain></el-button>
          <div v-for="item in itemList" :key="item.itemId">{{ item }}</div>
        </el-form-item>
        <el-card class="box-card">
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTransactionUpdate">Cancel</el-button>
    <el-button type="primary" @click="dialogTransactionUpdate">Confirm</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "AddNewTransactionInventory",
  data() {
    return {
      dialogTransaction: false,
      itemList: [],
      itemName:"",
      form: {
        itemId: []
      },
    }
  },
  methods: {
    loadAll() {
      return [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
      ];
    },
    dialogTransactionUpdate() {
      this.dialogTransaction = !this.dialogTransaction
    },
    getAllItem() {
      console.log('getting item list...')
      InventoryService.getAllItem().then(res => {
        console.log(res)
        for(let item of res.data){
          this.itemList.push({value: item.itemName, itemId: item.itemId})
        }
        console.log(this.itemList)
      }).catch(err => console.log(err))
    },
    getAllVendor() {
      console.log('getting vendor list...')
      InventoryService.getAllVendor().then(res => console.log(res)).catch(err => console.log(err))
    },
    querySearchAsync(queryString, cb) {
      let links = this.itemList;
      let results = queryString ? links.filter(this.createFilter(queryString)) : links;

      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.form.itemId.push(item.itemId)
    }
  }
}
</script>

<style scoped>

</style>

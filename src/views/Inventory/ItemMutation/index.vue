<!--suppress ALL -->
<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" label-position="top">
        <el-row>
          <el-col :span="4">
            <AddNewItem v-on:add-new-item-success="getAllItem"/>
          </el-col>
          <el-col :span="12">
            <el-select v-model="chosenCategory" placeholder="Category" @change="handleCategoryChange">
              <el-option v-for="category in allCategory" :key="category.categoryId" :label="category.categoryName"
                         :value="category.categoryName"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="search" style="display: inline-block; margin-bottom: 0">
              <el-input placeholder="search" v-model="search" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data_table_panel">
      <el-table
          :data="(filteredTableData || tableData).filter(data=>
          data.itemName.toLowerCase().includes(search.toLowerCase()) ||
          data.serialNumberItem.toLowerCase().includes(search) ||
          data.category.categoryName.toLowerCase().includes(search) ||
          data.description.toLowerCase().includes(search))"
          :default-sort="{prop:'itemName', order:'ascending'}">
        <el-table-column prop="serialNumberItem" label="SerialNumber" sortable></el-table-column>
        <el-table-column prop="itemName" label="Item Name" sortable></el-table-column>
        <el-table-column prop="category.categoryName" label="Category" sortable></el-table-column>
        <el-table-column prop="description" label="Description" sortable></el-table-column>
        <el-table-column label="Configuration">
          <template slot-scope="props">
            <DeleteItem button-size="mini" button-icon="el-icon-delete" :item-id="props.row.itemId" v-on:item-delete-success="getAllItem"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage"
import InventoryService from "@/services/InventoryService";
import AddNewItem from '@/components/Inventory/AddNewItem'
import DeleteItem from "@/components/Inventory/DeleteItem"

export default {
  name: "ItemMutation",
  components: {
    AddNewItem,
    DeleteItem
  },
  data() {
    return {
      form: {},
      search: "",
      user: null,
      tableData: [],
      filteredTableData: null,
      allCategory: [],
      chosenCategory: "",
    }
  },
  methods: {
    getAllItem() {
      InventoryService.getAllItem().then(res => {
        this.tableData = res.data
        console.log(res.data)
      })
    },
    getAllCategory() {
      InventoryService.getAllCategory().then(res => {
        this.allCategory = res.data
      })
    },
    handleCategoryChange() {
      this.filteredTableData = this.tableData.filter(item => item.category.categoryName === this.chosenCategory)
    },
  },
  created() {
    this.user = storage.get('user')
    this.getAllItem()
    this.getAllCategory()
  }
};
</script>

<style lang="scss" scoped>
.search_panel_form .el-select {
  width: auto;
}
</style>

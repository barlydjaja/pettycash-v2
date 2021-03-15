<!--suppress ALL -->
<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" label-position="top">
        <el-row>
          <el-col :span="16">
            <AddNewTransaction/>
            <el-form-item style="display: inline-block">
              <el-select v-model="branchName" placeholder="pilih cabang" :disabled="this.user.role.roleName!=='admin'"
                         @change="sortDataOnBranchChange">
                <el-option label="JAKARTA" value="JAKARTA"></el-option>
                <el-option label="SEMARANG" value="SEMARANG"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search_box">
            <el-form-item prop="search" style="display: inline-block">
              <el-input placeholder="search" v-model="search" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <!--            testing tag to check search-->
            <p>{{ search }}</p>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data_table_panel">
      <el-table
          :data="tableData.filter(
              (data)=>
                data.createdDate.includes(search) ||
                data.inventoryOrder.invoiceNumber.includes(search) ||
                data.inventoryOrder.serialNumberItem.includes(search)||
                data.categoryItem.toLowerCase().includes(search)||
                data.itemName.toLowerCase().includes(search)||
                data.inventoryOrder.vendor.vendorName.toLowerCase().includes(search)||
                data.jurnalNumber.includes(search)||
                data.inventoryOrder.statusOrder.includes(search))"
          :default-sort="{prop:'date', order:'descending'}"
          highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <h6>Journal Number: {{ props.row.jurnalNumber }}</h6>
            <p>Status Order: <strong>{{ props.row.inventoryOrder.statusOrder }}</strong></p>
            <p>Vendor Address: {{ props.row.inventoryOrder.vendor.address }}</p>
            <p>Item Description: {{ props.row.description }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Date" sortable>
          <template slot-scope="scope">
            {{ scope.row.inventoryOrder.invoiceDate ? scope.row.inventoryOrder.invoiceDate.split(" ")[0] : 0 }}
          </template>
        </el-table-column>
        <el-table-column label="No.Invoice" prop="inventoryOrder.invoiceNumber" sortable></el-table-column>
        <el-table-column label="No.Item" prop="serialNumberItem" sortable></el-table-column>
        <el-table-column label="Category" prop="category.categoryName" sortable>
        </el-table-column>
        <el-table-column label="Barang" prop="itemName" sortable></el-table-column>
        <el-table-column label="Vendor" prop="inventoryOrder.vendor.vendorName" sortable></el-table-column>
        <el-table-column label="Configuration">
<!--          <template slot-scope="scope">-->
            <el-button icon="el-icon-edit" size="mini"></el-button>
            <el-button icon="el-icon-truck" size="mini"></el-button>
<!--          </template>-->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import AddNewTransaction from "@/components/Inventory/AddNewTransaction"
import InventoryService from "@/services/InventoryService";

export default {
  name: "InventoryList",
  components: {
    AddNewTransaction
  },
  data() {
    return {
      tableData: [],
      form: {},
      search: "",
      user: null,
      branchName: null
    };
  },
  methods: {
    getAllItem() {
      InventoryService.getAllItem().then(res => {
        console.log(res.data)
        this.tableData = res.data
      }).catch(err => console.error(err))
    },

    sortDataOnBranchChange() {
      this.tableData.filter(data => data.inventoryOrder.from === this.branchName)
    }
  },
  created() {
    this.user = storage.get('user')
    this.branchName = this.user.branch.branchName
    this.getAllItem()
  }
};
</script>

<style lang="scss" scoped>
.search_box {
  text-align: center;
}

.icon-size {
  font-size: 2em;
}
</style>

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
                <el-option label="Jakarta" value="JAKARTA"></el-option>
                <el-option label="Semarang" value="SEMARANG"></el-option>
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
          :data="filteredtableData.filter(
              (data)=>
                data.createdDate.includes(search) ||
                data.inventoryOrder.invoiceNumber.includes(search) ||
                data.serialNumberItem.includes(search)||
                data.category.categoryName.toLowerCase().includes(search)||
                data.itemName.toLowerCase().includes(search)||
                data.inventoryOrder.vendor.vendorName.toLowerCase().includes(search)||
                data.inventoryOrder.jurnalNumber.includes(search)||
                data.inventoryOrder.statusOrder.includes(search))"
          :default-sort="{prop:'invoiceDate', order:'descending'}"
          highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <h6>Journal Number: {{ props.row.inventoryOrder.jurnalNumber }}</h6>
            <el-card shadow="hover">
              <p>Input item by: {{ props.row.inventoryOrder.user.username }}</p>
              <p>Email Address: {{ props.row.inventoryOrder.user.email }}</p>
              <p>Item Description: {{ props.row.description }}</p>
              <p>Vendor Address: {{ props.row.inventoryOrder.vendor.address }}</p>
              <p>Vendor Phone: {{props.row.inventoryOrder.vendor.phoneNumber}}</p>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column label="Invoice Date" prop="invoiceDate" sortable>
          <template slot-scope="scope">
            {{ scope.row.inventoryOrder.invoiceDate.split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="No.Invoice" prop="inventoryOrder.invoiceNumber" sortable></el-table-column>
        <el-table-column label="No.Item" prop="serialNumberItem" sortable></el-table-column>
        <el-table-column label="Category" prop="category.categoryName" sortable>
        </el-table-column>
        <el-table-column label="Barang" prop="itemName" sortable></el-table-column>
        <el-table-column label="Vendor" prop="inventoryOrder.vendor.vendorName" sortable></el-table-column>
        <el-table-column label="Configuration">
          <template slot-scope="props">
            <EditItem :item-detail="props.row"/>
            <TransferItem :itemDetail="props.row"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import AddNewTransaction from "@/components/Inventory/AddNewTransaction"
import InventoryService from "@/services/InventoryService";
import TransferItem from "@/components/Inventory/TransferItem"
import EditItem from "@/components/Inventory/EditItem"

export default {
  name: "InventoryList",
  components: {
    AddNewTransaction,
    TransferItem,
    EditItem,
  },
  data() {
    return {
      allTableData: [],
      filteredtableData: [],
      form: {},
      search: "",
      user: null,
      branchName: null
    };
  },
  methods: {
    getAllItem() {
      InventoryService.getAllItem().then(res => {
        this.allTableData = res.data
        this.filteredtableData = res.data.filter(data =>
            (data.inventoryOrder.from === this.branchName && data.inventoryOrder.to === null) ||
            (data.inventoryOrder.to === this.branchName))
      }).catch(err => console.error(err))
    },

    sortDataOnBranchChange() {
      this.filteredtableData = this.allTableData.filter(data =>
          (data.inventoryOrder.to === this.branchName) ||
          (data.inventoryOrder.from === this.branchName && data.inventoryOrder.to === null)
      )
      console.log(this.filteredtableData)
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

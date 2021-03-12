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
                data.inventoryOrder.statusOrder.includes(search)||
                data.inventoryOrder.user.includes(search))"
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
            {{ scope.row.createdDate.split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="No.Invoice" prop="inventoryOrder.invoiceNumber" sortable></el-table-column>
        <el-table-column label="No.Item" prop="serialNumberItem" sortable></el-table-column>
        <el-table-column label="Category" prop="categoryItem" sortable></el-table-column>
        <el-table-column label="Barang" prop="itemName" sortable></el-table-column>
        <el-table-column label="Vendor" prop="inventoryOrder.vendor.vendorName" sortable></el-table-column>
        <el-table-column label="User" prop="inventoryOrder.user" sortable></el-table-column>
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
      tableData: [
        // {
        //   date: "2016-05-03",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90036",
        // },
        // {
        //   date: "2016-05-02",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90035",
        // },
        // {
        //   date: "2016-05-04",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90034",
        // },
        // {
        //   date: "2016-05-01",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90033",
        // },
        // {
        //   date: "2016-05-08",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90032",
        // },
        // {
        //   date: "2016-05-06",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90031",
        // },
        // {
        //   date: "2016-05-07",
        //   name: "Tom",
        //   state: "California",
        //   city: "Los Angeles",
        //   address: "No. 189, Grove St, Los Angeles",
        //   zip: "CA 90030",
        // },
      ],
      form: {},
      search: "",
      user: null,
      branchName: null
    };
  },
  methods: {
    getAllItem() {
      InventoryService.getAllItem().then(res => {
        // console.log(res.data)
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

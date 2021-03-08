<!--suppress ALL -->
<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" label-position="top">
        <el-row>
          <el-col :span="16">
            <AddNewTransaction/>
            <el-form-item style="display: inline-block">
              <el-select v-model="branchName" placeholder="pilih cabang" :disabled="this.user.role.roleName!=='admin'">
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
          :data="tableData.filter(data=> data.date.toString().includes(search) ||
           data.name.toLowerCase().includes(search) ||
           data.state.toLowerCase().includes(search) ||
           data.city.toLowerCase().includes(search) ||
           data.address.toLowerCase().includes(search) ||
           data.zip.toString().includes(search))"
          :default-sort="{prop:'date',order:'descending'}"
          highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p>State:{{ props.row.state }}</p>
            <p>City:{{ props.row.city }}</p>
            <p>Address:{{ props.row.address }}</p>
            <p>Zip Code:{{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Date" prop="name" sortable></el-table-column>
        <el-table-column label="No.Invoice" prop="date" sortable></el-table-column>
        <el-table-column label="Branch" prop="state" sortable></el-table-column>
        <el-table-column label="Transaction" prop="city" sortable></el-table-column>
        <el-table-column label="Amount" prop="address" sortable></el-table-column>
        <el-table-column label="User" prop="zip" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import AddNewTransaction from "@/components/Inventory/AddNewTransaction"

export default {
  name: "InventoryList",
  components:{
    AddNewTransaction
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90035",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90034",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90033",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90032",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90031",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90030",
        },
      ],
      form: {},
      search: "",
      user: null,
      branchName: null
    };
  },
  created() {
    this.user = storage.get('user')
    this.branchName = this.user.branch.branchName
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

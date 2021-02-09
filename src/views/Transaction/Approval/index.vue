<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-row>
          <el-col :span="16">
            <el-form-item style="display: inline-block">
              <el-select v-model="form.month" @change="getTableData">
                <el-option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="month.value"
                  :label="month.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="branch" style="display: inline-block">
              <el-select
                v-model="form.branchName"
                placeholder="pilih cabang"
                @change="getTableData"
              >
                <el-option label="Jakarta" value="JAKARTA"></el-option>
                <el-option label="Semarang" value="SEMARANG"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search_box">
            <el-form-item prop="search" style="display: inline-block">
              <el-input
                placeholder="search"
                v-model="search"
                prefix-icon="el-icon-search"
              ></el-input
            ></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <p>{{ form }}</p> -->
          <el-col :span="16">
            <AddTransaction
              v-on:new-transaction="updateTable"
              v-bind:userId="this.user.userId"
            />
          </el-col>
          <el-col :span="8" class="search_box">
            <el-button @click="exportToExcel">excel download</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import storage from "@/libs/storage";
import axios from "axios";
import FileSaver from "file-saver";
import AddTransaction from "@/components/AddTransaction";

const user = storage.get("user");

export default {
  name: "Approval",
  components: { AddTransaction },
  data() {
    return {
      form: {
        branchName: user.branch,
        month: null,
        year: 2021,
      },
      rules: {},
      months: [
        { name: "January", value: 1 },
        { name: "February", value: 2 },
        { name: "March", value: 3 },
        { name: "April", value: 4 },
        { name: "May", value: 5 },
        { name: "June", value: 6 },
        { name: "Juli", value: 7 },
        { name: "August", value: 8 },
        { name: "September", value: 9 },
        { name: "October", value: 10 },
        { name: "November", value: 11 },
        { name: "December", value: 12 },
      ],
      search: "",
      user,
    };
  },
  methods: {
    getCurrentMonth() {
      const date = new Date();
      const month = date.toLocaleString("default", {
        month: "long",
      });
      const monthNumber = date.getMonth() + 1;
      this.form.month = monthNumber;
      return month;
    },
    exportToExcel() {
      //FIXME: first method

      const url =
        "http://10.69.72.99:8081/pettycash/v1/export/transaction?userId=1";
      axios
        .post(url, this.tableData, {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
          responseType: "blob",
        })
        .then((result) => {
          // console.log(result);
          FileSaver.saveAs(result.data);
        })
        .catch((err) => console.log(err));
    },
    updateTable() {
      this.getTableData();
    },
    getTableData() {
      EventService.getAllTransactionsByMonthAndBranch(this.form).then((res) => {
        const { status, data } = res;
        console.log(res);
        if (status === 200) this.tableData = data.reverse();
      });
    },
  },
  created() {
    this.getCurrentMonth();
    this.getTableData();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";

.page_menu_wrap {
  overflow: auto;
}
.page-menu {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 320px;
  height: 100%;
  /*width: 300px;*/
  background-color: $navMenuBgColor;
  /*overflow: hidden;*/
  flex-shrink: 0;
  z-index: 20;
  /*overflow: auto;*/
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
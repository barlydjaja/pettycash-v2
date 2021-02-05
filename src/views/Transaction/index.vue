// FIXME: ganti class binding untuk buka tutup
<template>
  <div class="page page-conf">
    <el-scrollbar v-show="true" class="page-menu" wrap-class="page_menu_wrap">
      <LeftMenu />
    </el-scrollbar>
    <div
      class="page-main"
      id="page_main"
      :class="{ 'page-main': true, 'page-main-padding': true }"
    >
      <div class="transaction">
        <div class="search_panel_form">
          <el-form ref="form" :model="form" :rules="rules" label-position="top">
            <el-row>
              <el-col :span="16">
                <el-form-item style="display: inline-block">
                  <el-select v-model="form.month">
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
              <p>{{ form }}</p>
              <el-col :span="16">
                <el-button>Tambah Transaksi</el-button>
              </el-col>
              <el-col :span="8" class="search_box">
                <el-button @click="exportToExcel">excel download</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- data table begin -->
        <div class="data_table_panel">
          <el-table
            highlight-current-row
            :data="tableData"
            :max-height="tableMaxHeight"
            style="width: 100%"
          >
            <el-table-column
              prop="transactionDate"
              :label="'Tanggal'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="user.username"
              :label="'Nama'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="transactionType.transactionTypeName"
              :label="'Transaksi'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="description"
              :label="'Deskripsi'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="amount"
              :label="'Mutasi'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="residue"
              :label="'Sisa Saldo'"
              min-width="150"
            ></el-table-column>
            <el-table-column prop="fileName" :label="'receipt'" min-width="150">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import storage from "@/libs/storage";
import LeftMenu from "@/components/left-menu";
import axios from "axios";
import fs from "fs";
export default {
  name: "Transaction",
  components: { LeftMenu },
  data() {
    return {
      form: {
        branchName: "JAKARTA",
        month: 1,
        year: 2021,
      },
      currentMonth: new Date().toLocaleString("default", { month: "long" }),
      months: [
        { name: "January", value: 0 },
        { name: "February", value: 1 },
        { name: "March", value: 2 },
        { name: "April", value: 3 },
        { name: "May", value: 4 },
        { name: "June", value: 5 },
        { name: "Juli", value: 6 },
        { name: "August", value: 7 },
        { name: "September", value: 8 },
        { name: "October", value: 9 },
        { name: "November", value: 10 },
        { name: "December", value: 11 },
      ],
      search: "",
      rules: {},
      tableData: [],
      user: storage.get("user"),
    };
  },
  created() {
    this.tableMaxHeight = window.document.body.clientHeight - 270;
    this.getTableData();
    this.getCurrentMonth();
  },
  methods: {
    getCurrentMonth() {
      const date = new Date();
      const month = date.toLocaleString("default", {
        month: "long",
      });
      return month;
    },
    getTableData() {
      EventService.getAllTransactionsByMonthAndBranch(this.form).then((res) => {
        const { status, data } = res;
        console.log(data);
        if (status === 200) this.tableData = data;
      });
    },
    updateMonth(monthNumber) {
      this.form.month = Number(monthNumber);
    },
    exportToExcel() {
      //FIXME: first method
      const user = storage.get("user");
      const url =
        "http://10.69.72.99:8081/pettycash/v1/export/transaction?userId=1";
      axios
        .post(url, this.tableData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Disposition": "attachment; filename=template.xlsx",
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          responseType: "arraybuffer",
        })
        .then((result) => {
          console.log(result);
          const outputFilename = "xyzzzz.xls";
          fs.writeFileSync(outputFilename, result.data);
          return outputFilename;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/function";

.txt_red {
  color: #f00;
}
.page_menu_wrap {
  overflow: auto;
}

.search_panel_form {
  background: #fff;
  padding: 20px 0 0 0;
  margin: 0 0 20px 0;
}

.search_box {
  text-align: center;
}

.page-conf {
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
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

.page-main {
  flex: 1;
  /*overflow: auto;*/
  /*padding: 15px;*/
  padding: 0;
  /*background-color: #f3f3f3;*/
  overflow-y: auto;
  overflow-x: hidden;
}
.page-main-padding {
  padding-left: 320px;
}

.icon-size {
  font-size: 2em;
}
</style>

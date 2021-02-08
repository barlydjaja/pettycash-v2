// FIXME: ganti class binding untuk buka tutup
<template>
  <div class="page page-conf">
    <el-scrollbar v-show="false" class="page-menu" wrap-class="page_menu_wrap">
      <LeftMenu />
    </el-scrollbar>
    <div
      class="page-main"
      id="page_main"
      :class="{ 'page-main': true, 'page-main-padding': false }"
    >
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
                <AddTransactions
                  v-on:new-transaction="updateTable"
                  v-bind:userId="this.user.userId"
                />
              </el-col>
              <el-col :span="8" class="search_box">
                <el-button @click="exportToExcel">excel download</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- <el-row>{{ search }}</el-row> -->
        </div>
        <!-- data table begin -->
        <div class="data_table_panel">
          <el-table
            highlight-current-row
            :data="
              !search
                ? pageOfItems
                : tableData.filter(
                    (data) =>
                      data.transactionDate.toString().includes(search) ||
                      data.user.username.includes(search) ||
                      data.transactionType.transactionTypeName.includes(
                        search
                      ) ||
                      data.description.includes(search) ||
                      data.amount.toString().includes(search) ||
                      data.residue.toString().includes(search)
                  )
            "
            :default-sort="{ prop: 'transactionDate', order: 'descending' }"
            :max-height="tableMaxHeight"
            style="width: 100%"
          >
            <el-table-column
              sortable
              prop="transactionDate"
              :label="'Tanggal'"
              min-width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.transactionDate.split(" ")[0] }}
                <!-- Rp {{ autoDot(scope.row.amount) }} -->
              </template>
            </el-table-column>
            <el-table-column
              sortable
              prop="user.username"
              :label="'Nama'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              sortable
              prop="transactionType.transactionTypeName"
              :label="'Transaksi'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              sortable
              prop="description"
              :label="'Deskripsi'"
              min-width="150"
            ></el-table-column>
            <el-table-column
              sortable
              prop="amount"
              :label="'Mutasi'"
              min-width="150"
            >
              <template slot-scope="scope">
                Rp {{ autoDot(scope.row.amount) }}
              </template></el-table-column
            >
            <el-table-column
              sortable
              prop="residue"
              :label="'Sisa Saldo'"
              min-width="150"
            >
              <template slot-scope="scope">
                Rp {{ autoDot(scope.row.residue) }}
              </template>
            </el-table-column>
            <el-table-column prop="fileName" :label="'receipt'" min-width="200">
              <template slot-scope="scope">
                <EditTransaction
                  v-bind:userId="user.userId"
                  v-bind:transactionId="scope.row.transactionId"
                  v-on:edit-transaction="updateTable"
                />
                <UploadPhoto
                  v-show="!scope.row.fileName"
                  v-bind:transactionId="scope.row.transactionId"
                  v-on:upload-photo="updateTable"
                />
                <DownloadPhoto
                  style="margin-left: 10px"
                  v-if="scope.row.fileName"
                  v-bind:transactionId="scope.row.transactionId"
                  v-bind:token="user.token"
                />
                <!-- <el-button
                  @click="handleDownload(scope.row.transactionId)"
                  size="mini"
                  v-show="scope.row.fileName"
                >
                  <i class="el-icon-download"></i>
                </el-button> -->
                <DeleteTransaction
                  style="margin-left: 10px"
                  v-bind:userId="user.userId"
                  v-bind:transactionId="scope.row.transactionId"
                  v-on:delete-transaction="updateTable"
                />
                <!-- <el-button
                  size="mini"
                  @click="handleDelete(scope.row.transactionId)"
                >
                  <i class="el-icon-delete"></i>
                </el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- paginaiton start -->
        <div class="text-center">
          <jw-pagination
            :items="tableData"
            @changePage="onChangePage"
          ></jw-pagination>
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
import FileSaver from "file-saver";
import AddTransactions from "@/components/AddTransaction";
import EditTransaction from "@/components/EditTransaction";
import DeleteTransaction from "@/components/DeleteTransaction";
import UploadPhoto from "@/components/UploadPhoto";
import DownloadPhoto from "@/components/DownloadPhoto";

export default {
  name: "Transaction",
  components: {
    LeftMenu,
    AddTransactions,
    EditTransaction,
    DeleteTransaction,
    UploadPhoto,
    DownloadPhoto,
  },
  data() {
    return {
      form: {
        branchName: "JAKARTA",
        month: null,
        year: 2021,
      },
      currentMonth: new Date().toLocaleString("default", { month: "long" }),
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
      pageOfItems: [],
      rules: {},
      tableData: [
        // {
        //   transactionDate: 12,
        //   user: {
        //     username: "ahmad",
        //   },
        //   transactionType: {
        //     transactionTypeName: "barang bekas",
        //   },
        //   description: "income",
        //   amount: 123,
        //   residue: 1233333,
        //   fileName: null,
        //   id: 12,
        // },
        // {
        //   transactionDate: 13,
        //   user: {
        //     username: "dani",
        //   },
        //   transactionType: {
        //     transactionTypeName: "barang baru",
        //   },
        //   description: "outcome",
        //   amount: 12345,
        //   residue: 0,
        //   fileName: "ada disini",
        //   id: 13,
        // },
        // {
        //   transactionDate: 14,
        //   user: {
        //     username: "luna",
        //   },
        //   transactionType: {
        //     transactionTypeName: "pribady",
        //   },
        //   description: "income",
        //   amount: 123,
        //   residue: 123,
        //   fileName: null,
        //   id: 14,
        // },
        // {
        //   transactionDate: 15,
        //   user: {
        //     username: "beni",
        //   },
        //   transactionType: {
        //     transactionTypeName: "personal",
        //   },
        //   description: "income",
        //   amount: 321,
        //   residue: 444,
        //   fileName: "ada disini bro",
        //   id: 15,
        // },
      ],
      user: storage.get("user"),
    };
  },
  created() {
    this.tableMaxHeight = window.document.body.clientHeight - 270;
    this.getCurrentMonth();
    this.getTableData();
  },
  methods: {
    updateTable() {
      this.getTableData();
    },

    autoDot(number) {
      return number.toLocaleString("id-ID");
    },

    handleDownload(id) {
      console.log(`id of ${id} will be downloaded`);
    },

    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
      // console.log(pageOfItems);
    },
    getCurrentMonth() {
      const date = new Date();
      const month = date.toLocaleString("default", {
        month: "long",
      });
      const monthNumber = date.getMonth() + 1;
      this.form.month = monthNumber;
      return month;
    },
    getTableData() {
      EventService.getAllTransactionsByMonthAndBranch(this.form).then((res) => {
        const { status, data } = res;
        console.log(data);
        if (status === 200) this.tableData = data.reverse();
      });
    },

    // FIXME: Tambahin update year
    // updateYear(){}

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

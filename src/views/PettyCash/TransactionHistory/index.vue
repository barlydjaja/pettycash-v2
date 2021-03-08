<template>
  <div class="transaction">
    <!-- <LabelOptions v-on:update-table="updateTableData" /> -->
    <div class="search_panel_form">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-row>
          <el-col :span="16">
            <el-form-item style="display: inline-block">
              <el-select v-model="form.year" @change="getTableData">
                <el-option
                  v-for="(year, index) in years"
                  :key="index"
                  :value="year.selectedYear"
                  :label="year.selectedYear"
                ></el-option>
              </el-select>
            </el-form-item>
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
            <el-form-item style="display: inline-block">
              <el-select
                v-model="form.branchName"
                placeholder="pilih cabang"
                @change="getTableData"
                :disabled="this.user.role.roleName !== 'admin'"
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
              v-on:new-transaction="onNewTransaction"
              v-bind:loading="isLoadingAddTransaction"
              v-bind:userId="this.user.userId"
            />
          </el-col>
          <el-col
            :span="8"
            class="search_box"
            v-show="this.user.role.roleName === 'admin'"
          >
            <el-button @click="exportToExcel">Excel Download</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- data table begin -->
    <div class="data_table_panel">
      <el-table
        v-loading="isLoadingTable"
        highlight-current-row
        :data="
          !search
            ? pageOfItems
            : tableData.filter(
                (data) =>
                  data.transactionDate.toString().includes(search) ||
                  data.user.username.toLowerCase().includes(search) ||
                  data.transactionType.transactionTypeName
                    .toLowerCase()
                    .includes(search) ||
                  data.description.toLowerCase().includes(search) ||
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
          min-width="120"
        >
          <template slot-scope="scope">
            <!-- {{ scope.row.transactionDate.toString() }} -->
            {{ scope.row.transactionDate.toString().split(" ")[0] }}
            <!-- Rp {{ autoDot(scope.row.amount) }} -->
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="user.username"
          :label="'Nama'"
          min-width="120"
        ></el-table-column>
        <el-table-column
          sortable
          prop="transactionType.transactionTypeName"
          :label="'Transaksi'"
          min-width="120"
        ></el-table-column>
        <el-table-column
          sortable
          prop="description"
          :label="'Deskripsi'"
          min-width="120"
        ></el-table-column>
        <el-table-column
          sortable
          prop="amount"
          :label="'Jumlah Transaksi'"
          min-width="120"
        >
          <template slot-scope="scope">
            <span
              v-bind:class="
                scope.row.receipt === 'income' ? 'income' : 'outcome'
              "
            >
              Rp {{ autoDot(scope.row.amount) }}
            </span>
          </template></el-table-column
        >
        <el-table-column
          sortable
          prop="residue"
          :label="'Mutasi'"
          min-width="120"
          v-if="
            this.user.role.roleName === 'admin' ||
            this.user.role.roleName === 'riliser'
          "
        >
          <template slot-scope="scope">
            Rp {{ autoDot(scope.row.residue) }}
          </template>
        </el-table-column>
        <el-table-column prop="fileName" :label="'receipt'" width="180px">
          <template slot-scope="scope">
            <EditTransaction
              :pendingUpdate="scope.row.pendingUpdate"
              :userId="user.userId"
              :transactionId="scope.row.transactionId"
              v-on:edit-transaction="onEditTransaction"
              :loading="isLoadingEditTransaction"
            />
            <UploadPhoto
              v-show="!scope.row.fileName"
              v-bind:transactionId="scope.row.transactionId"
              v-on:upload-photo="onUploadPhoto"
            />
            <DownloadPhoto
              style="margin-left: 10px"
              v-if="scope.row.fileName"
              v-bind:transactionId="scope.row.transactionId"
              v-bind:token="token"
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
        :pageSize="25"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import storage from "@/libs/storage";
// import axios from "axios";
import FileSaver from "file-saver";
import AddTransactions from "@/components/PettyCash/AddTransaction";
import EditTransaction from "@/components/PettyCash/EditTransaction";
import DeleteTransaction from "@/components/PettyCash/DeleteTransaction";
import UploadPhoto from "@/components/PettyCash/UploadPhoto";
import DownloadPhoto from "@/components/PettyCash/DownloadPhoto";
// const user = storage.get("user");

export default {
  name: "TransactionHistory",
  components: {
    AddTransactions,
    EditTransaction,
    DeleteTransaction,
    UploadPhoto,
    DownloadPhoto,
  },
  data() {
    return {
      isLoadingTable: false,
      isLoadingEditTransaction: false,
      isLoadingAddTransaction: false,
      form: {
        branchName: storage.get("user").branch.branchName,
        month: Number,
        year: Number,
      },

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
      years: [
        { selectedYear: new Date().getFullYear() - 3 },
        { selectedYear: new Date().getFullYear() - 2 },
        { selectedYear: new Date().getFullYear() - 1 },
        { selectedYear: new Date().getFullYear() },
      ],
      search: "",
      pageOfItems: this.tableData,
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
      user: null,
      token: storage.get("token"),
    };
  },

  created() {
    this.tableMaxHeight = window.document.body.clientHeight - 270;
    this.user = storage.get("user");
    this.getCurrentYear();
    this.getCurrentMonth();
    this.getTableData();
  },

  methods: {
    onUploadPhoto(formData) {
      // console.log(formData);
      EventService.uploadPhoto(formData)
        .then((res) => {
          const { data, status } = res;
          if (data && status === 200) {
            this.getTableData();
          }
        })
        .catch((err) => console.log(err));
    },

    onNewTransaction({ form, fileForm }) {
      this.isLoadingAddTransaction = true;
      // for (let i = 0; i < 2; i++) {
      EventService.addNewTransaction(form)
        .then((res) => {
          const { data, status } = res;
          if (data && status === 200) {
            if (fileForm) {
              fileForm.append(
                "transactionId",
                data.transactionId || data.notTransactionId
              );
              EventService.uploadPhoto(fileForm)
                .then((res) => {
                  const { data, status } = res;
                  this.$message.success("success");
                  if (data && status === 200) this.getTableData();
                })
                .catch((err) => console.log(err.message));
            } else {
              this.$message.success("success");
              this.getTableData();
            }
          } else {
            this.$message.alert("something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("lengkapi data");
        });
      // }
      this.isLoadingAddTransaction = false;
    },
    onEditTransaction({ form, transactionId }) {
      this.isLoadingEditTransaction = true;
      EventService.updateTransaction(form, transactionId)
        .then((res) => {
          const { data, status } = res;
          if (data.message && status === 200) {
            this.getTableData();
            this.isLoadingEditTransaction = false;
          }
        })
        .catch((err) => {
          console.log(err);
          const { status } = err.response;
          if (status === 500) {
            this.$message.error("lengkapi data");
            this.isLoadingEditTransaction = false;
          }
        });
    },
    onSearch(search) {
      this.search = search;
    },

    updateTable() {
      this.getTableData();
    },

    autoDot(number) {
      return number.toLocaleString("id-ID");
    },

    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getCurrentMonth() {
      const date = new Date();
      this.form.month = date.getMonth() + 1;
    },

    getCurrentYear() {
      const date = new Date();
      this.form.year = date.getFullYear();
    },

    getTableData() {
      this.isLoadingTable = true;
      EventService.getAllTransactionsByMonthAndBranch(this.form)
        .then((res) => {
          const { status, data } = res;
          // console.log(res);
          if (status === 200)
            this.tableData = data.reverse().filter((data) => {
              // console.log(this.user.role.roleName);
              if (this.user.role.roleName === "staff")
                return data.user.username === this.user.username;
              else if (
                this.user.role.roleName === "admin" ||
                this.user.role.roleName === "riliser"
              )
                return data;
            });
          this.isLoadingTable = false;
        })
        .catch((err) => {
          console.log(err);
          this.mesage.$error("can't get table data");
        });
    },

    exportToExcel() {
      const body = this.tableData;
      EventService.exportToExcel(this.user.userId, body)
        .then((res) => {
          FileSaver.saveAs(res.data);
          EventService.deleteExcel()
            .then((res) => console.log(res.status))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
  },
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

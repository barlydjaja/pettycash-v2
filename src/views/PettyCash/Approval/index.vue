<template>
  <div class="transaction">
    <!-- <LabelOptions v-on:update-table="updateTableData" /> -->
    <div class="search_panel_form">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-row>
          <!-- <el-col :span="16">
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
          </el-col> -->
          <el-col :span="8" class="search_box" style="float: right">
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
        highlight-current-row
        :data="
          !search
            ? pageOfItems
            : tableData.filter(
                (data) =>
                  data.transactionDate.toString().includes(search) ||
                  data.user.branch.branchName.toLowerCase().includes(search) ||
                  data.user.username.toLowerCase().includes(search) ||
                  data.transactionType.transactionTypeName
                    .toLowerCase()
                    .includes(search) ||
                  data.description.toLowerCase().includes(search) ||
                  data.amount.toString().includes(search)
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
            {{ scope.row.transactionDate.toString().split(" ")[0] }}
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
          prop="user.branch.branchName"
          :label="'Cabang'"
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

        <el-table-column prop="fileName" :label="'receipt'" width="240">
          <template slot-scope="scope">
            <EditTransaction
              v-bind:notTransactionId="scope.row.notTransactionId"
              v-on:edit-transaction="onEditTransaction"
            />
            <UploadPhoto
              v-show="!scope.row.fileName"
              v-bind:transactionId="scope.row.notTransactionId"
              v-on:upload-photo="onUploadPhoto"
            />
            <DownloadPhoto
              style="margin-left: 10px"
              v-if="scope.row.fileName"
              v-bind:transactionId="scope.row.notTransactionId"
              v-bind:token="token"
            />

            <el-button
              size="mini"
              style="margin-left: 10px"
              @click="handleReject(scope.row.notTransactionId)"
            >
              <i class="el-icon-close"></i>
            </el-button>

            <el-popconfirm
              v-if="user.role.roleName === 'admin'"
              icon="el-icon-info"
              icon-color="green"
              title="Approve Transaction?"
              @confirm="() => handleApprove(scope.row.notTransactionId)"
              style="margin-left: 10px"
            >
              <el-button size="mini" slot="reference">
                <i class="el-icon-check"></i>
              </el-button>
            </el-popconfirm>
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
</template>

<script>
import EventService from "@/services/EventService";
import storage from "@/libs/storage";
import FileSaver from "file-saver";
import AddTransactions from "@/components/AddTransaction";
import EditTransaction from "@/components/EditTransaction";
import UploadPhoto from "@/components/UploadPhoto";
import DownloadPhoto from "@/components/DownloadPhoto";
const user = storage.get("user");

export default {
  name: "TransactionHistory",
  components: {
    AddTransactions,
    EditTransaction,
    UploadPhoto,
    DownloadPhoto,
  },
  data() {
    return {
      form: {
        branchName: user.branch.branchName,
      },
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
      user,
      token: storage.get("token"),
    };
  },

  created() {
    this.tableMaxHeight = window.document.body.clientHeight - 270;
    this.getCurrentYear();
    this.getCurrentMonth();
    this.getTableData();
  },
  methods: {
    getCurrentYear() {
      const date = new Date();
      const year = date.getFullYear();
      this.form.year = year;
    },
    handleReject(notTransactionId) {
      this.$confirm("This will Reject The Transaction. Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          EventService.rejectApprove(notTransactionId)
            .then((res) => {
              const { status } = res;
              if (status === 200) {
                this.$message({
                  type: "warning",
                  message: "Transaction Rejected",
                });
              }
              this.getTableData();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Canceled",
          });
        });
    },
    onNewTransaction({ form, fileForm }) {
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
    },
    handleApprove(notTransactionId) {
      EventService.approve(notTransactionId, this.user.userId)
        .then((res) => {
          const { data, status } = res;
          if (data && status === 200) {
            this.$message({
              type: "success",
              message: "Transaction Approved",
            });
            this.getTableData();
          }
        })
        .catch((err) => console.log(err));
    },
    onUploadPhoto(formData) {
      EventService.uploadPhoto(formData)
        .then((res) => {
          const { data, status } = res;
          if (data && status === 200) {
            this.getTableData();
          }
        })
        .catch((err) => console.log(err));
    },
    onEditTransaction({ form }) {
      // console.log(form);
      EventService.updateNotApprovedTransaction(form).then(
        (res) => {
          const { status, data } = res;
          if (status === 200 && data) {
            this.$message({
              type: "success",
              message: "Table Updated",
            });
            this.getTableData();
          }
        }
        // console.log(res)
      );
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
      EventService.getNotApprovedTransactions(this.user.userId).then((res) => {
        const { status, data } = res;
        // console.log(res);
        if (status === 200) this.tableData = data.reverse();
      });
    },
    updateTableData() {
      EventService.getNotApprovedTransactions(this.user.userId).then((res) => {
        const { status, data } = res;
        console.log(res);
        if (status === 200) this.tableData = data.reverse();
      });
    },

    // FIXME: Tambahin update year
    // updateYear(){}
    exportToExcel() {
      const body = this.tableData;
      EventService.exportToExcel(this.user.userId, body)
        .then((res) => {
          FileSaver.saveAs(res.data);
          EventService.deleteExcel()
            .then((res) => console.log(res))
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
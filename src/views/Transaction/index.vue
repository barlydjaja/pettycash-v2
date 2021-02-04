<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-row>
          <el-col :span="16">
            <el-form-item prop="year" style="display: inline-block">
              <el-date-picker
                v-model="form.year"
                type="month"
                format="MMMM-yyyy"
                :clearable="true"
                :editable="true"
                :placeholder="'Pilih bulan dan tahun'"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="branch" style="display: inline-block">
              <el-select v-model="form.region" placeholder="pilih cabang">
                <el-option label="Jakarta" value="jakarta"></el-option>
                <el-option label="Semarang" value="semarang"></el-option>
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
      </el-form>
    </div>
    <!-- data table begin -->
    <div class="data_table_panel">
      <el-table
        :data="tableData"
        :max-height="tableMaxHeight"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          :label="'Tanggal'"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="username"
          :label="'Nama'"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="transaction"
          :label="'Transaksi'"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="description"
          :label="'Deskripsi'"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="mutation"
          :label="'Mutasi'"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="endBalance"
          :label="'Sisa Saldo'"
          min-width="150"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import EventService from "@/services/EventService";
import storage from "@/libs/storage";
export default {
  name: "Transaction",
  components: {},
  data() {
    return {
      form: {},
      search: "",
      rules: {},
      tableData: [],
      user: storage.get("user"),
      config: {
        header: {
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJ0ZXN0MTIzIiwidXNlcklkIjoxLCJyb2xlIjp7InJvbGVJZCI6MSwicm9sZU5hbWUiOiJhZG1pbiIsImRlc2NyaXB0aW9uIjoiYWRtaW4gcm9sZSJ9fQ.n10ieojNZJbTEcsmvJ8kXLhpakKo7DpQPxtXFxPW6ZfjDUKd0CbpuVFEBrFhkkUZKIKWgUe7yNa-gA4wrSjyvA`,
        },
      },
    };
  },
  created() {
    const date = new Date();
    this.form.year = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    this.tableMaxHeight = window.document.body.clientHeight - 270;
    this.getTableData();
  },
  methods: {
    getTableData() {
      // const config = {
      //   header:{
      //     Authorization: `Bearer `
      //   }
      // }
      EventService.getTransactionsByBranch("JAKARTA", this.config).then((res) =>
        console.log(res)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.search_panel_form {
  background: #fff;
  padding: 20px 0 0 0;
  margin: 0 0 20px 0;
}

.search_box {
  text-align: center;
}
</style>

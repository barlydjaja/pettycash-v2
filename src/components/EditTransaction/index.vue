<template>
  <div style="display: inline-block">
    <el-button
      size="mini"
      @click="editDialog = true"
      :disabled="pendingUpdate === 'y'"
    >
      <i class="el-icon-edit" />
    </el-button>

    <!-- dialog starts here -->
    <el-dialog :visible.sync="editDialog" title="Edit Transaksi:" width="30%">
      <!-- form begins here -->
      <el-form :label-position="'top'" :model="form">
        <!-- Description -->
        <el-form-item label="Deskripsi:">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- TransactionType -->
        <el-form-item label="Jenis Transaksi:">
          <el-select
            placeholder="Choose One"
            v-model="form.receipt"
            style="width: 100%"
          >
            <el-option
              v-for="(transactionType, index) in transactionsType"
              :key="index"
              :value="transactionType.value"
              :label="transactionType.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- TransactionName -->
        <el-form-item label="Nama Transaksi:">
          <el-select
            v-model="form.transactionTypeId"
            placeholder="Choose One"
            style="width: 100%"
          >
            <el-option
              v-for="(transaction, index) in transactionsName"
              :key="index"
              :value="transaction.value"
              :label="transaction.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- TransactionAmount -->
        <el-form-item label="Jumlah"
          ><el-input
            v-model.number="form.amount"
            placeholder="..."
            type="number"
          ></el-input
        ></el-form-item>
        <el-card class="box-card">
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">Cancel</el-button>
        <el-button @click="handleSubmit">submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import EventService from "@/services/EventService";
export default {
  name: "EditTransaction",
  props: {
    transactionId: Number,
    userId: Number,
    notTransactionId: Number,
    pendingTransactionId: Number,
    pendingUpdate: String,
  },
  data() {
    return {
      editDialog: false,
      form: {
        userId: this.$props.userId,
        notTransactionId: this.$props.notTransactionId,
        pendingTransactionId: this.$props.pendingTransactionId,
      },
      transactionsName: [
        { name: "Transportation", value: 2 },
        { name: "Medical", value: 3 },
        { name: "Consumption", value: 4 },
        { name: "Office Supplies", value: 5 },
        { name: "Courier Fee", value: 6 },
        { name: "Stamp Duty", value: 7 },
        { name: "phone", value: 8 },
        { name: "Internet", value: 9 },
        { name: "Entertainment", value: 10 },
        { name: "Reimburse", value: 11 },
        { name: "Top Up", value: 12 },
      ],
      transactionsType: [
        { name: "Income", value: "income" },
        { name: "Expense", value: "outcome" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("edit-transaction", {
        form: this.form,
        transactionId: this.$props.transactionId,
      });
      this.editDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
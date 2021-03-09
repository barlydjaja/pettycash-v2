<template>
  <div style="display: inline-block">
    <el-button size="mini" @click="handleDelete()">
      <i class="el-icon-delete"></i>
    </el-button>
  </div>
</template>

<script>
import EventService from "@/services/PettyCashService";
export default {
  name: "DeleteTransaction",
  props: {
    transactionId: Number,
    userId: Number,
  },
  methods: {
    handleDelete() {
      this.$confirm(
        `This will permanently delete the file. Continue? `,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          EventService.deleteTransaction(
            this.$props.transactionId,
            this.$props.userId
          )
            .then((res) => {
              const { status, data } = res;
              if (data.message && status === 200) {
                this.$message({
                  type: "success",
                  message: "Delete completed",
                });
                this.$emit("delete-transaction");
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 500) this.$message.error("error");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

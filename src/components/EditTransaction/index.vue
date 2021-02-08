<template>
  <el-button size="mini" @click="editDialog = true">
    <i class="el-icon-edit" />

    <!-- dialog starts here -->
    <el-dialog>
      <span>this is the body part</span>
      <span slot="footer" class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button>Submit</el-button>
      </span>
    </el-dialog>
  </el-button>
</template>

<script>
export default {
  name: "EditTransaction",
  props: {
    transactionId: Number,
  },
  data() {
    return {
      editDialog: false,
    };
  },
  methods: {
    handleEdit() {
      console.log("edited");
      console.log(this.$props.transactionId);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
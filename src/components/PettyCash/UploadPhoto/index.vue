<template>
  <div style="display: inline-block">
    <el-button
      style="margin-left: 10px"
      @click="uploadDialog = true"
      size="mini"
    >
      <i class="el-icon-upload"></i>
    </el-button>

    <!-- dialog starts -->
    <el-dialog title="Upload Gambar" :visible.sync="uploadDialog" width="30%">
      <input type="file" ref="file" accept="image/*" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialog = false">cancel</el-button>
        <el-button @click="handleUpload">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import EventService from "@/services/EventService";
export default {
  name: "UploadPhoto",
  props: { transactionId: Number },
  data() {
    return {
      uploadDialog: false,
      file: "",
    };
  },
  methods: {
    handleUpload() {
      // console.log(this.$props.transactionId);
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("transactionId", this.$props.transactionId);
      this.$emit("upload-photo", formData);
      this.uploadDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
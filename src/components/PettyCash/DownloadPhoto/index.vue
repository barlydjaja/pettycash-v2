<template>
  <a
    v-auth-href="{ token: token }"
    v-bind:href="
      'http://10.69.72.99:7001/pettycash/v1/file/download/' + transactionId
    "
    target="_blank"
  >
    <el-button size="mini">
      <i class="el-icon-download"></i>
    </el-button>
  </a>
</template>

<script>
export default {
  name: "DownloadPhoto",
  props: { transactionId: Number, token: String },
};
</script>

<style lang="scss" scoped>
</style>

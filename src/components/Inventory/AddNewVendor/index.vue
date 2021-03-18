<template>
  <div style="display: inline-block">
    <el-button icon="el-icon-plus" size="mini" @click="dialogVisible=true" round></el-button>
    <el-dialog title="Add New Vendor Info" :visible.sync="dialogVisible" append-to-body>
      <el-form ref="form" :model="form">
        <el-form-item label="Vendor Name">
          <el-input v-model="form.vendorName"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input type="number" v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Add Vendor</el-button>
          <el-button @click="dialogVisible=false">Cancel</el-button>
        </el-form-item>
        <el-card>
          <pre>{{ form }}</pre>
        </el-card>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "AddNewVendor",
  data() {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  methods: {
    onSubmit() {
      let body = this.form
      InventoryService.addNewVendor(body)
          .then(res => {
            console.log(res)
            this.$emit('new-vendor-added')
          })
          .catch(err => console.error('addNewVendor', err.response))
      this.dialogVisible = false
    }
  },
}
</script>

<style scoped>

</style>

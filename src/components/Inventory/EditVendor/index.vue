<template>
  <div style="display: inline">
    <el-button type="text" @click="dialogVisible=true;">edit</el-button>
    <el-dialog title="Edit Vendor Info" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="Address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Phone Number">
          <el-input type="number" v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="Vendor Name">
          <el-input v-model="form.vendorName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleUpdateVendor">Confirm</el-button>
          <el-button @click="dialogVisible=false">Cancel</el-button>
        </el-form-item>
        <el-form-item>
          <el-card>
            <pre>{{ form }}</pre>
          </el-card>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "EditVendor",
  props: {
    vendorInfo: Object,
  },
  data() {
    const {address, description, phoneNumber, vendorId, vendorName} = this.vendorInfo
    return {
      dialogVisible: false,
      form: {
        address,
        description,
        phoneNumber,
        vendorId,
        vendorName,
      }
    }
  },
  methods: {
    handleUpdateVendor() {
      const body = this.form
      InventoryService.updateVendorData(body).then(res => {
        console.log(res)
        this.$emit('update-vendor-success')
      }).catch(err => console.error('update-vendor', err.response))
    }
  }
}
</script>

<style scoped>

</style>

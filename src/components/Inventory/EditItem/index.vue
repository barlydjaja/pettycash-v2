<template>
  <div style="display: inline-block">
    <el-button type="text" style="padding-top: 0" @click="dialogVisible=true; getAllCategory()">Edit</el-button>
    <el-dialog :visible.sync="dialogVisible" title="Edit Transaction" append-to-body>
      <el-form label-position="top">
        <el-form-item label="Category">
          <el-select v-model="form.categoryId">
            <el-option v-for="category in categoryList" :key="category.categoryId" :label="category.categoryName"
                       :value="category.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Serial Number">
          <el-input v-model="form.serialNumberItem"></el-input>
        </el-form-item>
        <el-form-item label="Item Name">
          <el-input v-model="form.itemName"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleUpdateItem" type="primary">Confirm</el-button>
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
  name: "EditItem",
  props: {
    itemDetail: Object,
  },
  data() {
    const {category, description, itemId, itemName, serialNumberItem} = this.itemDetail
    return {
      dialogVisible: false,
      form: {
        description,
        categoryId: category.categoryId,
        itemId,
        itemName,
        serialNumberItem,
      },
      categoryList: [],
    }
  },
  methods: {
    getAllCategory() {
      InventoryService.getAllCategory().then(res => {
        this.categoryList = res.data
      })
    },
    handleUpdateItem() {
      const body = this.form
      const inventoryOrderId = this.itemDetail.inventoryOrder.inventoryOrderId
      InventoryService.updateItemData(body)
          .then(res => {
            const {status} = res
            if (status === 200)
              this.$emit('update-item-success', inventoryOrderId)
            this.dialogVisible = false
          })
          .catch(err => console.error('error when updating item', err))
    },
  },
}
</script>

<style scoped>

</style>

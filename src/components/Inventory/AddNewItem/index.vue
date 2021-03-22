<template>
  <div>
    <el-button :type="buttonType" @click="dialogVisible = true; getAllCategory()" icon="el-icon-plus">Add Item</el-button>
    <el-dialog title="Add New Item" :visible.sync="dialogVisible" append-to-body>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="Category" prop="categoryId">
          <el-select v-model="form.categoryId" filterable placeholder="select Category">
            <el-option v-for="category in categoryList"
                       :key="category.categoryId"
                       :label="category.categoryName"
                       :value="category.categoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Item Name" prop="itemName">
          <el-input v-model="form.itemName"></el-input>
        </el-form-item>

        <el-form-item label="Serial Number" prop="serialNumberItem">
          <el-input v-model="form.serialNumberItem"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">Add Item</el-button>
          <el-button>Cancel</el-button>
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
  name: "addNewItem",
  props: {
    buttonType: String,
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      categoryList: [],
      categoryName: "",
      rules: {
        categoryId: [
          {required: true, message: 'select Category', trigger: 'blur'},
        ],
        description: [
          {required: true, message: 'Put Item Description', trigger: 'blur'}
        ],
        itemName: [
          {required: true, message: 'Item Must Have a name', trigger: 'blur'}
        ],
        serialNumberItem: [
          {required: true, message: 'Item Must Have a Unique Serial Number', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    getAllCategory() {
      console.log("Getting All category...")
      InventoryService.getAllCategory().then(res => {
        console.log(res.data)
        this.categoryList = res.data
      }).catch(err => console.log(err))
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        console.log("submiting...")
        if (valid) {
          let body = this.form
          InventoryService.addNewItem(body).then(res => {
            console.log(res.data)
            this.$store.commit("addNewItemCreated", res.data)
            this.$store.commit("addNewItemId", res.data.itemId)
            this.dialogVisible = false
            this.$refs[formName].resetFields()
          })
          this.$emit('add-new-item-success')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

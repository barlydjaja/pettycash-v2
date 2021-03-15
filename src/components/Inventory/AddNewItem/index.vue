<template>
  <div>
    <el-button type="text" @click="dialogVisible = true; getAllCategory()" icon="el-icon-plus">Add Item</el-button>
    <el-dialog title="Add New Item" :visible.sync="dialogVisible" append-to-body>
      <el-form ref="form" :model="form">
        <el-form-item label="Category">
          <el-autocomplete v-model="categoryName" :fetch-suggestions="querySearchAsyncCategory" placeholder="Category"
                           @select="setCategoryId"></el-autocomplete>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Item Name">
          <el-input v-model="form.itemName"></el-input>
        </el-form-item>
        <el-form-item label="Journal Number">
          <el-input v-model="form.jurnalNumber"></el-input>
        </el-form-item>
        <el-form-item label="Serial Number">
          <el-input v-model="form.serialNumberItem"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Add Item</el-button>
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
  data() {
    return {
      dialogVisible: false,
      form: {},
      categoryList: [],
      categoryName: "",

    }
  },
  methods: {
    getAllCategory() {
      console.log("Getting All category...")
      InventoryService.getAllCategory().then(res => {
        console.log(res.data)
        for (let category of res.data) {
          this.categoryList.push({
            value: category.categoryName,
            categoryId: category.categoryId,
            description: category.description
          })
        }
      }).catch(err => console.log(err))
    },
    querySearchAsyncCategory(queryString, cb) {
      let links = this.categoryList;
      let results = queryString ? links.filter(this.createFilterCategory(queryString)) : links;
      cb(results)
    },
    createFilterCategory(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    setCategoryId(category) {
      this.form.categoryId = category.categoryId
    },
    onSubmit() {
      console.log("submiting...")
      let body = this.form
      InventoryService.addNewItem(body).then(res => {
        this.$store.commit("addNewItemCreated", res.data)
        this.$store.commit("addNewItemId", res.data.itemId)
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>

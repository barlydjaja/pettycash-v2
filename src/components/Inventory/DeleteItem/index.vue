<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-button :type="buttonType" :size="buttonSize" :icon="buttonIcon" @click="confirmDelete"><span class="delete-button">{{ buttonText }}</span>
    </el-button>
  </div>
</template>

<script>
import InventoryService from "@/services/InventoryService";

export default {
  name: "DeleteItem",
  props: {
    itemId: Number,
    buttonText: String,
    buttonType: String,
    buttonSize: String,
    buttonIcon: String,
  },
  methods: {
    confirmDelete() {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        const itemId = this.itemId
        console.log(itemId)
        InventoryService.deleteItem(itemId).then(
            res => {
              const {status} = res
              if (status === 200)
                this.$message({
                  type: 'success',
                  message: 'Delete completed'
                });
              this.$emit('item-delete-success')
            }
        ).catch(err=>console.error('DeleteItem', err.response))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    }
  }


}
</script>

<style scoped>

.delete-button{
  color: red;
}

</style>

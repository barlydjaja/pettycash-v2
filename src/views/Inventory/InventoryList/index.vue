<!--suppress ALL -->
<template>
  <div class="transaction">
    <div class="search_panel_form">
      <el-form ref="form" :model="form" label-position="top">
        <el-row>
          <el-col :span="16">
            <AddNewTransaction v-on:new-transaction-created="getAllInventoryOrder"/>
            <el-form-item style="display: inline-block">
              <el-select v-model="branchName" placeholder="pilih cabang" :disabled="this.user.role.roleName!=='admin'"
                         @change="sortDataOnBranchChange">
                <el-option label="Jakarta" value="JAKARTA"></el-option>
                <el-option label="Semarang" value="SEMARANG"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="search_box">
            <el-form-item prop="search" style="display: inline-block">
              <el-input placeholder="search" v-model="search" prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <!--            testing tag to check search-->
            <p>{{ search }}</p>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data_table_panel">
      <el-table
          v-loading="isLoadingTransaction"
          ref="filteredTableData"
          :data="filteredtableData"
          :default-sort="{prop:'invoiceDate', order:'descending'}"
          @row-click="onRowClick"
          highlight-current-row
      >
        <el-table-column type="expand" style="z-index: 0">
          <template slot-scope="props">
            <el-card style="margin-bottom: 20px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <span><strong>Vendor:</strong> {{ props.row.vendor.vendorName }}</span>
                </el-col>
                <el-col :span="6">
                  <span><strong>Alamat:</strong> {{ props.row.vendor.address }}</span>
                </el-col>
                <el-col :span="5">
                  <span><strong>Phone:</strong> {{ props.row.vendor.phoneNumber }}</span>
                </el-col>
                <el-col :span="6">
                  <span><strong>Description:</strong> {{ props.row.vendor.description }}</span>
                </el-col>
                <el-col :span="1">
                  <span><EditVendor :vendor-info="props.row.vendor" v-on:update-vendor-success="getAllInventoryOrder"/></span>
                </el-col>
              </el-row>
            </el-card>
            <el-row :gutter="20">
              <div v-if="isLoadingItem">

              </div>
              <div v-else></div>
              <div v-for="(item,index) in itemInfoByInvoice" :key="index">
                <el-col
                    :span="8"
                    v-if="item.inventoryOrder.inventoryOrderId === props.row.inventoryOrderId"
                >
                  <el-card style="margin-bottom: 10px">
                    <p>
                      <span class="icon-card_right">
                        <el-popover placement="left" trigger="click" min-width="50">
                            <EditItem style="display: block" :item-detail="item"
                                      v-on:update-item-success="handleUpdateItem"/>
                            <TransferItem :item-detail="item.inventoryOrder" :selected-item="item" type="text"
                                          button-text="Transfer Item"
                                          v-on:transfer-item-success="getAllInventoryOrder"
                                          v-on:transfered-item-id="deleteTransferedItemOnSelectedRowById"
                            />
                          <el-button icon="el-icon-more" type="text" slot="reference"></el-button>
                        </el-popover>
                      </span>
                      Serial Number: <strong>{{ item.serialNumberItem }}</strong>
                    </p>
                    <p>
                      Category: <strong>{{ item.category.categoryName }}</strong>
                    </p>
                    <p>
                      Item Name: <strong>{{ item.itemName }}</strong>
                    </p>
                    <p>
                      Description: {{ item.description }}
                    </p>
                  </el-card>
                </el-col>
              </div>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="Invoice Date" prop="invoiceDate" sortable>
          <template slot-scope="scope">
            {{ scope.row.invoiceDate.split(" ")[0] }}
          </template>
        </el-table-column>
        <el-table-column label="No.Invoice" prop="invoiceNumber" sortable></el-table-column>
        <el-table-column label="Journal Number" prop="jurnalNumber"></el-table-column>
        <el-table-column label="User" prop="user.username" sortable></el-table-column>
        <el-table-column label="Vendor" prop="vendor.vendorName" sortable></el-table-column>
        <el-table-column label="Description" prop="description"></el-table-column>
        <el-table-column label="Configuration">
          <template slot-scope="props">
            <EditTransaction :item-detail="props.row" v-on:edit-success="getAllInventoryOrder"/>
            <TransferItem :item-detail="props.row" v-on:transfer-item-success="getAllInventoryOrder"
                          icon="el-icon-truck" button-size="mini" tooltip-content="Transfer Mass Item"/>
            <DeleteTransaction :inventory-order-id="props.row.inventoryOrderId"
                               :invoice-number="props.row.invoiceNumber"
                               v-on:delete-transaction-success="getAllInventoryOrder"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import storage from "@/libs/storage";
import AddNewTransaction from "@/components/Inventory/AddNewTransaction"
import InventoryService from "@/services/InventoryService";
import TransferItem from "@/components/Inventory/TransferItem"
import EditTransaction from "@/components/Inventory/EditTransaction"
import DeleteTransaction from "@/components/Inventory/DeleteTransaction"
import EditItem from "@/components/Inventory/EditItem"
import EditVendor from "@/components/Inventory/EditVendor";

export default {
  name: "InventoryList",
  components: {
    EditVendor,
    AddNewTransaction,
    TransferItem,
    EditTransaction,
    DeleteTransaction,
    EditItem,
  },
  data() {
    return {
      isLoadingTransaction: false,
      isLoadingItem: false,
      allTableData: [],
      filteredtableData: [],
      form: {},
      search: "",
      user: null,
      branchName: null,
      itemInfoByInvoice: []
    };
  },
  methods: {
    deleteTransferedItemOnSelectedRowById(itemId){
      console.log(itemId)
    },
    handleUpdateItem(inventoryOrderId) {
      InventoryService.getAllItemById(inventoryOrderId).then(res => {
        this.itemInfoByInvoice = res.data
      })
    },
    onRowClick(data) {
      const inventoryOrderId = data.inventoryOrderId
      const obj = this.itemInfoByInvoice.find(currentItem => currentItem.inventoryOrder.inventoryOrderId === inventoryOrderId)
      if (!obj) {
        InventoryService.getAllItemById(inventoryOrderId).then(res => {
          const items = res.data
          for (let item of items) {
            if (!this.itemInfoByInvoice.find(currentItem => currentItem.itemId === item.itemId) || !this.itemInfoByInvoice.find(currentItem => currentItem.inventoryOrder.inventoryOrderId === item.inventoryOrder.inventoryOrderId))
              this.itemInfoByInvoice.push(item)
          }
        })
      }
      this.$refs.filteredTableData.toggleRowExpansion(data);
    },
    getAllInventoryOrder() {
      this.isLoadingTransaction = true
      InventoryService.getAllInventoryOrder().then(res => {
        console.log("getting all inventory order", res.data)
        this.allTableData = res.data
        this.filteredtableData = res.data.filter(data =>
            (data.from === this.branchName && !data.to) ||
            (data.to === this.branchName))
        this.isLoadingTransaction = false
      }).catch(err => console.error(err))
    },

    sortDataOnBranchChange() {
      this.filteredtableData = this.allTableData.filter(data =>
          (data.to === this.branchName) ||
          (data.from === this.branchName && !data.to)
      )
    },
  }
  ,
  created() {
    this.user = storage.get('user')
    this.branchName = this.user.branch.branchName
    this.getAllInventoryOrder()
  }
}
</script>

<style lang="scss" scoped>
.search_box {
  text-align: center;
}

.icon-size {
  font-size: 2em;
}

.icon-card_right {
  float: right;
  transform: rotate(90deg);
}
</style>

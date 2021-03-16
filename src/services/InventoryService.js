import api from "@/api"
import apiInventory from "@/api/ApiInventory"

export default {
    getAllCategory() {
        return apiInventory().get(api.getAllCategory())
    },
    addCategory(body) {
        return apiInventory().post(api.addCategory(), body)
    },
    updateCategory(body) {
        return apiInventory().post(api.updateCategory(), body)
    },


    getAllVendor() {
        return apiInventory().get(api.getAllVendor())
    },
    addNewVendor(body) {
        return apiInventory().post(api.addNewVendor(), body)
    },
    updateVendorData(body) {
        return apiInventory().post(api.updateVendorData(), body)
    },


    getAllItem() {
        return apiInventory().get(api.getAllItem())
    },
    addNewItem(body) {
        return apiInventory().post(api.addNewItem(), body)
    },
    updateItemData(body) {
        return apiInventory().post(api.updateItemData(), body)
    },
    deleteItem(body){
        return apiInventory().post(api.deleteItem(), body)
    },
    deleteAllItem(body) {
        return apiInventory().post(api.deleteAllItem(), body)
    },


    getAllStatusTransaction() {
        return apiInventory().get(api.getAllStatusTransaction())
    },
    addNewStatus(body) {
        return apiInventory().post(api.addNewStatus(), body)
    },
    updateStatus(body) {
        return apiInventory().post(api.updateStatus(), body)
    },


    getAllInventoryOrder() {
        return apiInventory().get(api.getAllInventoryOrder())
    },
    addInventoryOrder(body) {
        return apiInventory().post(api.addInventoryOrder(), body)
    },

}

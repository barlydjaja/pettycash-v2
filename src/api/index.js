const version = "v1"
const view = "view"
const transaction = "transaction"
const vendor = 'vendor'
const item = 'item'
const status = 'status-transaction'
const inventoryOrder = 'inventory-order'
const category = 'category'


export default {
    login: "/secured/login",


    /* PETTY CASH */
    // for view
    viewAllTransactionsByMonthAndBranch: `${version}/${view}/getPerYearMonthAndBranch`,
    viewApprovedTransactions(branch) {
        return `${version}/${view}/getTransactionsByBranch?branch=${branch.toUpperCase()}`;
    },
    viewNotApprovedTransactions(userId) {
        return `${version}/${view}/not-approved-transaction?userId=${userId}`;
    },
    pendingUpdate(userId) {
        return `${version}/${view}/pending-update?userId=${userId}`;
    },
    pendingDelete(userId) {
        return `${version}/${view}/pending-delete?userId=${userId}`;
    },

    // for control transaction
    addNewTransaction: `${version}/${transaction}/add`,
    updateNotApprovedTransaction: `${version}/${transaction}/update-approve`,
    editPending: `${version}/${transaction}/edit-pending`,
    updateTransaction(transactionId) {
        // update transaction
        return `${version}/${transaction}/update?transactionId=${transactionId}`;
    },
    deleteTransaction(transactionId, userId) {
        return `${version}/${transaction}/delete?transactionId=${transactionId}&userId=${userId}`;
    },
    approve(transactionId, userId) {
        // approve new transaction
        return `${version}/${transaction}/approve?transactionId=${transactionId}&userId=${userId}`;
    },
    approveUpdate(transactionId, userId) {
        // approve edited transaction
        return `${version}/${transaction}/approve-update?transactionId=${transactionId}&userId=${userId}`;
    },
    rejectApprove(transactionId) {
        return `${version}/${transaction}/reject-approve?transactionId=${transactionId}`;
    },
    rejectUpdate(transactionId) {
        return `${version}/${transaction}/reject-update?transactionId=${transactionId}`;
    },
    rejectDelete(transactionId) {
        return `${version}/${transaction}/reject-delete?transactionId=${transactionId}`;
    },

    //for photo
    uploadPhoto: `${version}/file/upload`,
    uploadPendingPhoto: `${version}/file/upload-pending`,
    downloadPhoto(transactionId) {
        return `${version}/file/download/${transactionId}`;
    },

    // for excel
    exportToExcel(userId) {
        return `${version}/export/transaction?userId=${userId}`;
    },
    deleteExcel: `${version}/export/delete-temp`,

    // for profile
    updateUserInfo(userId) {
        return `${version}/profile/update?userId=${userId}`;
    },
    allUsers(userId) {
        return `${version}/profile/all-users?userId=${userId}`;
    },
    allRole: `${version}/profile/all-role`,
    register(userId) {
        return `${version}/profile/register?userId=${userId}`;
    },
    updateRole: `${version}/profile/update-role`,

//TODO: input inventory api
    /* INVENTORY */


    //Category
    getAllCategory(){
        return `${version}/${category}/get-all-categories`
    },
    addCategory(){
        return `${version}/${category}/add`
    },
    updateCategory(){
        return`${version}/${category}/update`
    },


    //vendor
    getAllVendor() {
        return `${version}/${vendor}/get-all-vendors`
    },

    addNewVendor() {
        return `${version}/${vendor}/add`
    },

    updateVendorData() {
        return `${version}/${vendor}/update`
    },


    //item
    getAllItem() {
        return `${version}/${item}/get-all-items`
    },
    getAllItemById(inventoryOrderId){
        return `${version}/${item}/get-by-order-id?inventoryOrderId=${inventoryOrderId}`
    },
    addNewItem() {
        return `${version}/${item}/add`
    },
    updateItemData() {
        return `${version}/${item}/update`
    },
    deleteItem(){
        return `${version}/${item}/delete`
    },
    deleteAllItem(){
        return `${version}/${item}/mass-delete`
    },


    //status-transaction
    getAllStatusTransaction() {
        return `${version}/${status}/get-all-status`
    },
    addNewStatus() {
        return `${version}/${status}/add`
    },
    updateStatus() {
        return `${version}/${status}/update`
    },


    //ADDING NEW INVENTORY ORDER
    addInventoryOrder() {
        return `${version}/${inventoryOrder}/add`
    },
    getAllInventoryOrder(){
        return `${version}/${inventoryOrder}/get-all-inventory-orders`
    },
    updateInventoryOrder(){
        return `${version}/${inventoryOrder}/update`
    },
    deleteInventoryOrder(inventoryOrderId){
        return `${version}/${inventoryOrder}/delete?orderId=${inventoryOrderId}`
    }
};

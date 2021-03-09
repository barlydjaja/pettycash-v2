//import inventory and its children
import Inventory from "@/views/Inventory"
import InventoryHome from "@/views/Inventory/Home"
import InventoryList from "@/views/Inventory/InventoryList"
import ItemMutation from "@/views/Inventory/ItemMutation"
//import petty cash and its children
import PettyCash from "@/views/PettyCash"
import PettyCashHome from "@/views/PettyCash/Home"
import PettyCashApproval from "@/views/PettyCash/Approval"
import PettyCashDeleted from "@/views/PettyCash/Deleted"
import PettyCashEdited from "@/views/PettyCash/Edited"
import PettyCashTransactionHistory from "@/views/PettyCash/TransactionHistory"


//testing the Inventory template to at least have a name
describe('Template for Inventory', function(){
    it('should contain a name Inventory', function () {
        expect(Inventory.name).toEqual("Inventory")
    });
})
describe('Template for Inventory Home', function(){
    it('should contain a name InventoryLandingPage', function () {
        expect(InventoryHome.name).toEqual("InventoryLandingPage")
    });
})
describe('Template for Inventory List', function(){
    it('should contain a name InventoryList', function () {
        expect(InventoryList.name).toEqual("InventoryList")
    });
})
describe('Template for Item Mutation', function(){
    it('should contain a name Item Mutation', function () {
        expect(ItemMutation.name).toEqual("ItemMutation")
    });
})

//testing the Pettycash Template to at least have a name
describe('Template for PettyCash', function(){
    it('should contain a name PettyCash', function () {
        expect(PettyCash.name).toEqual("PettyCash")
    });
})
describe('Template for PettyCashHome', function(){
    it('should contain a name Petty Cash Landing Page', function () {
        expect(PettyCashHome.name).toEqual("PettyCashLandingPage")
    });
})
describe('Template for PettyCashApproval', function(){
    it('should contain a name Petty Cash Approval', function () {
        expect(PettyCashApproval.name).toEqual("PettyCashApproval")
    });
})
describe('Template for PettyCashDeleted', function(){
    it('should contain a name Petty Cash Deleted', function () {
        expect(PettyCashDeleted.name).toEqual("PettyCashDeleted")
    });
})
describe('Template for PettyCashEdited', function(){
    it('should contain a name Petty Cash Edited', function () {
        expect(PettyCashEdited.name).toEqual("PettyCashEdited")
    });
})
describe('Template for PettyCashTransactionHistory', function(){
    it('should contain a name Petty Cash Transaction History', function () {
        expect(PettyCashTransactionHistory.name).toEqual("PettyCashTransactionHistory")
    });
})

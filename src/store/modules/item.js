const state = {
    newItemCreated: [],
    newItemId: []
};

const mutations = {
    addNewItemCreated(state, itemInfo) {
        state.newItemCreated.push(itemInfo)
    },
    addNewItemId(state, itemId){
        state.newItemId.push(itemId)
    },
    deleteSelectedItem(state, selectedItemIndex){
        state.newItemCreated.splice(selectedItemIndex,1)
    },
    deleteSelectedId(state, selectedIdIndex){
        state.newItemId.splice(selectedIdIndex,1)
    },
};


export default {
    state,
    mutations,
};

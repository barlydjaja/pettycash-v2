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
    }
};


export default {
    state,
    mutations,
};

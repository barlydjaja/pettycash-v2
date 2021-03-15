import storage from "@/libs/storage";

const state = {
    show: false,
    isLock: storage.get("lockMenu") || false,
    leftMenuActiveIndex: "0",
};

const mutations = {
    toggleMenuShow(state, show) {
        if (typeof show === "undefined") state.show = !state.show;
        else state.show = show;
    },
    changeLeftMenuActiveIndex(state, leftMenuActiveIndex) {
        state.leftMenuActiveIndex = leftMenuActiveIndex;
    },
};

const actions = {
    setShowAction(context, show) {
        context.commit("toggleMenuShow", show)
    },
};

export default {
    state,
    mutations,
    actions,
};

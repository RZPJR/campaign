const mutations = {
    //List ItemSection
    setItemSectionList: function(state, payload) {
        state.itemsection_list.data = payload;
        return state;
    },
    setPreloadItemSectionList: function(state, payload) {
        state.itemsection_list.isLoading = payload;
        return state;
    },
    setFilterItemSectionList: function(state, payload) {
        state.itemsection_list.filter = payload;
        return state;
    },
    setDefaultFilterItemSectionList: function(state, payload) {
        state.itemsection_list.filter = {
            search: '',
            region:'',
            archetype:'',
            status:''
        };
        return state;
    },

    //Detail ItemSection
    setItemSectionDetail: function(state, payload) {
        state.itemsection_detail.data = payload;
        return state;
    },

    // Archive ItemSection
    setItemSectionArchiveID: function(state, payload) {
        state.archive.id = payload;
        return state;
    },
    setItemSectionArchiveNote: function(state, payload) {
        state.archive.note = payload;
        return state;
    },
    setItemSectionArchivePosition: function(state, payload) {
        state.archive.position = payload;
        return state;
    },
    setItemSectionShowArchiveModal: function(state, payload) {
        state.archive.archive_modal = payload;
        return state;
    },
    setItemSectionArchiveError: function(state, payload) {
        state.archive.error = payload;
        return state;
    },

    // Create ItemSection
    setPreloadItemList: function(state, payload) {
        state.itemsection_createupdate.isLoading = payload;
        return state;
    },
    setItemSectionCreateProduct: function(state, payload) {
        state.itemsection_createupdate.product_list = payload;
        return state;
    },
    setItemSectionCreateCategory: function(state, payload) {
        state.itemsection_createupdate.category = payload;
        return state;
    },
    setItemSectionCreateRegion: function(state, payload) {
        state.itemsection_createupdate.form.regions.push(payload);
        return state;
    },
    setItemSectionCreateArchetype: function(state, payload) {
        state.itemsection_createupdate.form.archetypes.push(payload);
        return state;
    },
    setFormItemSection: function(state, payload) {
        state.itemsection_createupdate.form = payload;
        return state;
    },
    setDateItemSection: function(state, payload) {
        state.itemsection_createupdate.date = payload;
        return state;
    },
    setItemSectionSearchProduct: function(state, payload) {
        state.itemsection_createupdate.search_list = payload;
        return state;
    },

    // Update ItemSection
    setFormUpdateItemSection: function(state, payload) {
        state.itemsection_createupdate.form = payload;
        return state;
    },
};

export default mutations;

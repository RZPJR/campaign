const mutations = {
    //List Campaign
    setCampaignList: function(state, payload) {
        state.campaign_list.data = payload;
        return state;
    },
    setPreloadCampaignList: function(state, payload) {
        state.campaign_list.isLoading = payload;
        return state;
    },
    setFilterCampaignList: function(state, payload) {
        state.campaign_list.filter = payload;
        return state;
    },
    setDefaultFilterCampaignList: function(state, payload) {
        state.campaign_list.filter = {
            search: '',
            region:'',
            archetype:'',
            status:''
        };
        return state;
    },

    //Create Campaign
    setFormCampaignCreate: function(state, payload) {
        state.campaign_create.form = payload;
        return state;
    },
    setStartDateCampaignCreate: function(state, payload) {
        state.campaign_create.form.start_at = payload;
        return state;
    },
    setEndDateCampaignCreate: function(state, payload) {
        state.campaign_create.form.finish_at = payload;
        return state;
    },
    setAreaCampaignCreate: function(state, payload) {
        state.campaign_create.form.regions.push(payload);
        return state;
    },
    setArchetypeCampaignCreate: function(state, payload) {
        state.campaign_create.form.archetypes.push(payload);
        return state;
    },
    setRedirectToCampaignCreate: function(state, payload) {
        state.campaign_create.form.redirect_to = payload;
        return state;
    },
    setRedirectValueCampaignCreate: function(state, payload) {
        state.campaign_create.form.redirect_value = String(payload);
        return state;
    },

    //Detail Campaign
    setCampaignDetail: function(state, payload) {
        state.campaign_detail.data = payload;
        return state;
    },

    // Archive
    setCampaignListArchiveID: function(state, payload) {
        state.archive.id = payload;
        return state;
    },
    setCampaignListArchiveNote: function(state, payload) {
        state.archive.note = payload;
        return state;
    },
    setShowArchiveModal: function(state, payload) {
        state.archive.show_archive_modal = payload;
        return state;
    },
    setCampaignListArchivePosition: function(state, payload) {
        state.archive.position = payload;
        return state;
    },
};

export default mutations;

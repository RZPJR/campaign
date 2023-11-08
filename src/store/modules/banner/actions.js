import http from "../../../services/http";
import Vue from 'vue'
import Pagination from "../pagination";

const actions = {
    // Get List Banner
    fetchCampaignList: async ({ state, commit, dispatch }, payload) => {
        commit("setCampaignList", [])
        commit("setPreloadCampaignList", true);
        try {
            let filter = state.campaign_list.filter
            let pagination = Pagination.state.pagination
            let search = filter.search
            let region = filter.region
            let archetype = filter.archetype
            let status = filter.status
            const response = await http.get("/banner",{params:{
                page: pagination.page,
                per_page : pagination.rows_per_page,
                search : search,
                region_id : region,
                archetype_id : archetype,
                status : status,
                order_by : '-id'
            }});
            if (response.data.data && response.data.data != null){
                commit("setCampaignList", response.data.data)
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit("setPreloadCampaignList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadCampaignList", false);
        }
    },
    
    // Get Detail Banner
    fetchCampaignDetail: async ({ commit, state, dispatch }, payload) => {
        commit("setPreloadCampaignList", true);
        commit("setCampaignDetail", []);
        try {
            const response = await http.get("/banner/"+payload);
            if (response.data.data) commit("setCampaignDetail", response.data.data)
            commit("setPreloadCampaignList", false);   
        } catch (error) {
            console.log(error)
            commit("setPreloadCampaignList", false);   
        }
    },
    // Create Banner
    fetchCampaignCreate: async ({ commit, state, dispatch }, payload) => {
        commit("setFormCampaignCreate", {
            name: '',
            regions: [],
            archetypes: [],
            start_at: '',
            finish_at: '',
            image_url: '',
            redirect_to: 0,
            redirect_value: '',
            queue: 1
        }); 
    },
    // Archive Banner
    archiveBanner: async ({ commit, state, dispatch }, payload) => {
        let id = state.archive.id
        try {            
            await http.put("/banner/archive/"+id, {note: state.archive.note}).then(response => {
                Vue.$toast.open({
                    position: 'top-right',
                    message: 'Data has been archived successfully',
                    type: 'success',
                });
                commit("setCampaignListArchiveID", 0)
                commit("setCampaignListArchiveNote", "")
                commit("setShowArchiveModal", false)  

                if (state.archive.position === 'list') {
                    dispatch("fetchCampaignList")
                } else {
                    dispatch("fetchCampaignDetail", id)
                }
            });   
        } catch (error) {
            console.log(error)
        }
    }
};

export default actions;

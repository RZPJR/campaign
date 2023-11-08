import http from "../../../services/http";
import Vue from 'vue'
import Pagination from "../pagination";

const actions = {
    // Create Item Section
    fetchItemSectionList: async ({ state, commit, dispatch }, payload) => {
        commit("setItemSectionList", [])
        commit("setPreloadItemSectionList", true);
        try {
            let filter = state.itemsection_list.filter
            let search = filter.search
            let region = filter.region
            let archetype = filter.archetype
            let status = filter.status 
            let pagination = Pagination.state.pagination
            const response = await http.get("/item_section",{params:{
                page: pagination.page,
                per_page : pagination.rows_per_page,
                search : search,
                region_id : region,
                archetype_id : archetype,
                status : status,
                order_by : '-id'
            }});
            if (response.data.data && response.data.data != null) {
                commit("setItemSectionList", response.data.data)
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit("setPreloadItemSectionList", false);            
        } catch (error) {
            console.log(error)
            commit("setPreloadItemSectionList", false);
        }
    },

    // Get Detail Item Section
    fetchItemSectionDetail: async ({ commit, state, dispatch }, payload) => {
        commit("setItemSectionDetail", {})
        try {
            const response = await http.get("/item_section/"+payload);
            if (response.data.data) {
                commit("setItemSectionDetail", response.data.data)
            }
        } catch (error) {
            console.log(error) 
        }
    },
    
    // Archive Item Section
    archiveItemSection: async ({ commit, state, dispatch }, payload) => {
        let id = state.archive.id
        try {            
            await http.put("/item_section/archive/"+id, {note: state.archive.note}).then(response => {
                Vue.$toast.open({
                    position: 'top-right',
                    message: 'Data has been archived successfully',
                    type: 'success',
                });
                commit("setItemSectionShowArchiveModal", false)
                if (state.archive.position == 'list') {
                    dispatch("fetchItemSectionList")
                } else {
                    dispatch("fetchItemSectionDetail", id)
                }
                commit("setItemSectionArchiveError", {})
            });   
        } catch (error) {
            commit("setItemSectionArchiveError", error.errors)
            console.log(error)
        }
    },

    // Create & Update Item Section
    getProductListItemSection: async ({ state, commit, dispatch }, payload) => {
        try {
            let search = state.itemsection_createupdate.search_list
            let category = state.itemsection_createupdate.category
            commit("setPreloadItemList", true)
            const response = await http.get("/catalog/v1/item_section/item",{
                params:{
                    page: 1,
                    per_page : 10,
                    search:search,
                    item_category_id: category,
                    status: '1',
                }
            }, true);
            commit("setPreloadItemList", false)
            if (response.data.data && response.data.data != null) {
                commit("setItemSectionCreateProduct", response.data.data)
            } else {
                commit("setItemSectionCreateProduct", [])
            }
        } catch (error) {
            console.log(error)
        }
    },
    fetchItemSectionForm: async ({ commit, state, dispatch }, payload) => {
        commit("setFormItemSection", {
            name: "",
            sequence: 1,
            type: 1,
            regions: [],
            archetypes: [],
            start_at: "",
            finish_at: "",
            background_image: "",
            items: []
        }); 
        commit("setItemSectionSearchProduct", "")
    },
    fetchItemSectionUpdate: async ({ commit, state, dispatch }, payload) => {
        commit('setFormUpdateItemSection', {
            name: "",
            sequence: 1,
            type: 1,
            regions: [],
            archetypes: [],
            region: [],
            archetype: [],
            start_at: "",
            finish_at: "",
            background_image: "",
            items: []
        });
        try {
            const response = await http.get("/item_section/"+payload.id);
            let res = response.data.data
            if (res) {
                commit("setFormUpdateItemSection", {
                    ...state.itemsection_createupdate.form,
                    code: res.code,
                    name: res.name,
                    sequence: res.sequence,
                    type: res.type,
                    region: res.region,
                    archetype: res.archetype,
                    regions: res.regions,
                    archetypes: res.archetypes,
                    start_at: res.start_at,
                    finish_at: res.finish_at,
                    background_image: res.background_image,
                    items: res.items
                })
            }
        } catch (error) {
            console.log(error) 
        }
    },
    fetchItemSectionDate: async ({ commit, state, dispatch }, payload) => {
        commit("setDateItemSection", {
            start_date : {
                input : new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                model : '',
            },
            start_time : {
                input : '',
                model : '',
            },
            finish_date : {
                input : '',
                model : '',
            },
            finish_time : {
                input : '23:59',
                model : '',
            },
            current_date: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
        }); 
    },
};

export default actions;

import http from "../../../services/http";
import Vue from 'vue'
import Pagination from "../pagination";

const actions = {
    // Readlist Notification
    fetchNotification: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadNotification', true);
        commit('setOverlayNotification', true);
        commit('setNotification', []);
        try {
            let filter = state.notification_list.filter
            let search = filter.search
            let region = filter.region
            let status = filter.status 
            let schedule_date_start = ''
            let schedule_date_end = ''
            let pagination = Pagination.state.pagination
            if (state.notification_list.filter.schedule_date.date.length > 0) {
                if (state.notification_list.filter.schedule_date.date.length == 1) {
                    schedule_date_start = state.notification_list.filter.schedule_date.date[0]
                    schedule_date_end = state.notification_list.filter.schedule_date.date[0]
                } else {
                    schedule_date_start = state.notification_list.filter.schedule_date.date[0]
                    schedule_date_end = state.notification_list.filter.schedule_date.date[1]
                }
            }
            const response = await http.get("/push_notification", {
                params: {
                    page: pagination.page,
                    per_page : pagination.rows_per_page,
                    order_by: '-id',
                    scheduled_at_from: schedule_date_start,
                    scheduled_at_to: schedule_date_end,
                    status: status,
                    region_id: region,
                    search: search,
                }
            });
            if (response.data.data){
                commit('setNotification', response.data.data);
                commit('setPagination', {
                    ...pagination,
                    total_items: response.data.total !== null ? response.data.total : 0
                })
            }
            commit('setPreloadNotification', false);
            commit('setOverlayNotification', false);
        } catch (error) {
            commit('setPreloadNotification', false);
            commit('setOverlayNotification', false);
        }
    },

    // Detail Notification
    fetchNotificationDetail: async ({ state, commit, dispatch }, payload) => {
        commit('setPreloadDetailNotification', true);
        commit('setDetailNotification', []);
        try {
            const response = await http.get("/push_notification/"+payload.id);
            if (response.data.data) {
                commit('setDetailNotification', response.data.data);
                dispatch("fetchRedirectTo")
            }
            commit('setPreloadDetailNotification', false);
        } catch (error) {
            commit('setPreloadDetailNotification', false);
        }
    },

    // Create Notification
    fetchNotificationCreate: async ({ commit, state, dispatch }, payload) => {
        commit('setConfirmNotificationCreate', {});
        commit('setFormNotificationCreate', {
            campaign_name: "",
            regions: [],
            archetypes: [],
            redirect_to: 0,
            redirect_value: "",
            title: "",
            message: "",
            push_now: 2,
            scheduled_at: null
        }); 
    },

    // Create Notification
    fetchNotificationUpdate: async ({ commit, state, dispatch }, payload) => {
        commit('setErrorNotificationUpdate', {});
        commit('setFormNotificationUpdate', {});
        try {
            const response = await http.get("/push_notification/"+payload.id);
            let res = response.data.data
            if (res) {
                commit('setFormNotificationUpdate', {
                    ...state.update_notification.form,
                    code: res.code,
                    campaign_name: res.campaign_name,
                    regions: res.regions,
                    archetypes: res.archetypes,
                    redirect_to: res.redirect_to,
                    redirect_value: res.redirect_value,
                    title: res.title,
                    message: res.message,
                    push_now: res.push_now,
                    scheduled_at: res.scheduled_at
                });
                commit('setObjNotificationUpdate', {
                    ...state.update_notification.obj,
                    region: res.region,
                    archetype: res.archetype,
                    redirect: res.redirect
                });
            }
        } catch (error) {
            console.log(error)
        }
    },

    // Cancel Notification
    cancelNotification: async ({ commit, state, dispatch }, payload) => {
        let id = state.cancel_notification.id
        try {            
            await http.put("/push_notification/cancel/"+id, {note: state.cancel_notification.note}).then(response => {
                Vue.$toast.open({
                    position: 'top-right',
                    message: 'Data has been cancelled successfully',
                    type: 'success',
                });
                commit("setNotificationCancelModal", false)
                if (state.cancel_notification.position == 'list') {
                    dispatch("fetchNotification")
                } else {
                    dispatch("fetchNotificationDetail", {id:id})
                }
                commit("setNotificationCancelError", {})
            });   
        } catch (error) {
            commit("setNotificationCancelError", error.errors)
            console.log(error)
        }
    },

    //Get Redirect to 
    fetchRedirectTo: async ({ state, commit, dispatch }, payload) => {
        try {
            const response = await http.get("/configuration/v1/glossary", {
                params: {
                    perpage: 10,
                    attribute:'redirect_to',
                    value_int: parseInt(state.detail_notification.item.redirect_to),
                    table: 'notification_campaign',
                }}, true)
            if (response.data.data) 
            commit('setRedirectToNotification', response.data.data[0]);
        } catch (error) {
            console.log(error)
        }
    },
};

export default actions;

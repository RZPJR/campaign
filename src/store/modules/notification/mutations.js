const mutations = {
    // Readlist 
    setPreloadNotification: function(state, payload) {
        state.notification_list.isLoading = payload;
    return state;
    },
    setOverlayNotification: function(state, payload) {
        state.notification_list.overlay = payload;
    return state;
    },
    setNotification: function(state, payload) {
        state.notification_list.data = payload;
        return state;
    },
    setDefaultFilterNotificationList: function(state, payload) {
        state.notification_list.filter = {
            model: false,
            search: '',
            region:'',
            archetype:'',
            status:'',
            schedule_date : {
                input : "",
                model : "",
                date : [],
            },
        };
        return state;
    },

    // Detail Notification
    setPreloadDetailNotification: function(state, payload) {
        state.detail_notification.overlay = payload;
        return state;
    },
    setDetailNotification: function(state, payload) {
        state.detail_notification.item = payload;
        return state;
    },

    //Create Notification
    setConfirmNotificationCreate: function(state, payload) {
        state.create_notification.ConfirmData = payload;
        state.create_notification.error = {};
        state.create_notification.send_time = '';
        state.create_notification.send_date = '';
        return state;
    },
    setFormNotificationCreate: function(state, payload) {
        state.create_notification.form = payload;
        return state;
    },

    //Update Notification
    setErrorNotificationUpdate: function(state, payload) {
        state.update_notification.error = payload;
        state.update_notification.confirm_data = payload;
        return state;
    },
    setFormNotificationUpdate: function(state, payload) {
        state.update_notification.form = payload;
        return state;
    },
    setObjNotificationUpdate: function(state, payload) {
        state.update_notification.obj = payload;
        return state;
    },
    setRedirectToNotification: function(state, payload) {
        state.detail_notification.item.redirect_api = payload;
        return state;
    },

    //Cancel  Notification
    setNotificationCancelID: function(state, payload) {
        state.cancel_notification.id = payload;
        return state;
    },
    setNotificationCancelNote: function(state, payload) {
        state.cancel_notification.note = payload;
        return state;
    },
    setNotificationCancelPosition: function(state, payload) {
        state.cancel_notification.position = payload;
        return state;
    },
    setNotificationCancelModal: function(state, payload) {
        state.cancel_notification.modal = payload;
        return state;
    },
    setNotificationCancelError: function(state, payload) {
        state.cancel_notification.error = payload;
        return state;
    },
};

export default mutations;

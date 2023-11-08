const state = {
    // Readlist Notification
    notification_list: {
        isLoading: false,
        filter:{
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
        },
        status_options : [
            {
                text : 'All Status',
                value : '',
            },
            {
                text : 'Active',
                value : 1,
            },
            {
                text : 'Finished',
                value : 2,
            },
            {
                text : 'Cancelled',
                value : 3,
            },
            {
                text : 'Draft',
                value : 5,
            },
        ],
        table_header: [
            {
                text:'Schedule Push',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Campaign Name',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Region',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Archetype',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Redirect To',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Success Sent',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Open',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Conversion',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                class: 'grey--text text--darken-4',
                width: "5%",
                sortable: false
            },
            {
                text:'',
                width: "3%",
                sortable: false
            },
        ],
        data:[],
    },

    //Cancel Notification
    cancel_notification : {
        id: 0,
        note: '',
        position: '',
        error: {},
        modal: false, 
    },

    // Create Notification
    create_notification: {
        ConfirmData:{},
        form:{
            campaign_name: "",
            regions: [],
            archetypes: [],
            redirect_to: 0,
            redirect_value: "",
            title: "",
            message: "",
            push_now: 2,
            scheduled_at: null
        },
        error:{},
        min_date: new Date(Date.now() + ( 3600 * 1000 * 7)).toISOString().substr(0, 10),
        send_time_model: '',
        send_time: '',
        send_date_model: '',
        send_date: '',
    },

    // Detail Notification
    detail_notification: {
        item:[],
        overlay : false,
        dataAuditLog : {},
    },

    // Update Notification
    update_notification: {
        confirm_data: {},
        error:{},
        min_date: new Date(Date.now() + ( 3600 * 1000 * 7)).toISOString().substr(0, 10),
        send_time_model: '',
        send_date_model: '',
        overlay : false,
        obj: {
            product: '',
            product_tag: '',
            archetype: '',
            region: '',
            redirect : '',
            send_date: '',
            send_time: '',
        },
        form:{
            code: "",
            campaign_name: "",
            regions: [],
            archetypes: [],
            redirect_to: 0,
            redirect_value: "",
            title: "",
            message: "",
            push_now: 2,
            scheduled_at: null
        },
    }
};

export default state;

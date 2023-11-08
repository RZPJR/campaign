const state = {
    // Readlist Item Section
    itemsection_list : {
        isLoading: false,
        data:[],
        filter : {
            search: '',
            region:'',
            archetype:'',
            status:''
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
                text : 'Draft',
                value : 5,
            },
            {
                text : 'Archived',
                value : 7,
            },
        ],
        table_header : [
            {
                text:'Item Section Name',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Type',
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
                text:'Start Date',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'End Date',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                width: "5%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width: "5%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
        ],
    },
    
    // Item Section Detail
    itemsection_detail : {
        data: {},
        table_header : [
            {
                text: 'No.',
                width: '5%',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
            {
                text: 'Item',
                sortable: false,
                class: 'grey--text text--darken-4',
            },
        ],
    },

    // Archive Item Section
    archive: {
        id: 0,
        note: '',
        position: '',
        error: {},
        archive_modal: false,
    },

    // Create & Update Item Section
    itemsection_createupdate : {
        isLoading: false,
        sequenceNumber: [1,2,3,4,5],
        form : {
            code: "",
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
        },
        category : '',
        search_list : '',
        product_list : [],
        date : {
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
        }
    }
};

export default state;

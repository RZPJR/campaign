const state = {
    // Readlist Banner
    campaign_list : {
        isLoading: false,
        data:[],
        filter:{
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
        table_header: [
            {
                text:'Image',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Banner Name',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Region',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Archetype',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Redirect To',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Start Date',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'End Date',
                width: "10%",
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
        error: {},
    },

    // Create Banner
    campaign_create : {
        queueNumber: [1,2,3,4,5],
        form: {
            name: '',
            regions: [],
            archetypes: [],
            start_at: '',
            finish_at: '',
            image_url: '',
            redirect_to: 0,
            redirect_value: '',
            queue: 1
        },
    },

    // Detail Banner
    campaign_detail : {
        data : [],
    },

    // Archive
    archive: {
        id: 0,
        position: '',
        note: '',
        show_archive_modal: false,
    }
};

export default state;

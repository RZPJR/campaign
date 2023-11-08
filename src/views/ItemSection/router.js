export default [
    {
        path: '/campaign/item-section',
        name: 'ItemSectionList',
        component: () => import("./Index.vue"),
        meta: {
            title: 'Item Section List'
        }
    },
    {
        path: '/campaign/item-section/create',
        name: 'ItemSectionCreate',
        component: () => import("./Create"),
        meta: {
            title: 'Create Item Section',
            breadcrumbs : [
                {
                    text: 'Item Section List',
                    to : '/campaign/item-section'
                },
                {
                    text: 'Create Item Section',
                },
            ],
        }
    },
    {
        path: '/campaign/item-section/:id',
        name:'ItemSectionDetail',
        component: () => import("./Detail"),
        meta: {
            title: 'Item Section Detail',
            breadcrumbs : [
                {
                    text: 'Item Section List',
                    to : '/campaign/item-section'
                },
                {
                    text: 'Item Section Detail',
                },
            ],
        },
    },
    {
        path: '/campaign/item-section/update/:id',
        name: 'ItemSectionUpdate',
        component: () => import("./Update"),
        meta: {
            title: 'Update Item Section',
            breadcrumbs: [
                {
                    text: 'Item Section List',
                    to: '/campaign/item-section'
                },
                {
                    text: 'Item Section Detail',
                    to: '/campaign/item-section/:id'
                },
                {
                    text: 'Update Item Section',
                },
            ],
        }
    },
]
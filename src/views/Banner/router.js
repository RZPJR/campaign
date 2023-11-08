export default [
    {
        path: '/campaign/banner',
        name: 'BannerList',
        component: () => import("./Index.vue"),
        meta: {
            title: 'Banner List'
        }
    },
    {
        path: '/campaign/banner/create',
        name: 'BannerCreate',
        component: () => import("./Create"),
        meta: {
            title: 'Create Banner',
            breadcrumbs : [
                {
                    text: 'Banner List',
                    to : '/campaign/banner'
                },
                {
                    text: 'Create Banner',
                },
            ],
        }
    },
    {
        path: '/campaign/banner/:id',
        name:'BannerDetail',
        component: () => import("./Detail"),
        props: true,
        meta: {
            title: 'Banner Detail',
            breadcrumbs : [
                {
                    text: 'Banner List',
                    to : '/campaign/banner'
                },
                {
                    text: 'Banner Detail',
                },
            ],
        },
    },
]
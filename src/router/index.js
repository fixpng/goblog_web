import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../views/login.vue")
        }, {
            path: "/admin",
            name: "admin",
            component: () => import("../views/admin/admin.vue"),
            children: [
                {
                    path: "",
                    name: "admin_index",
                    redirect: "/admin/home"
                },
                {
                    path: "home",
                    name: "home",
                    component: () => import("../views/admin/home/home.vue")
                },
                {
                    path: "user_list",
                    name: "user_list",
                    component: () => import("../views/admin/user_mgr/user_list.vue")
                },
                {
                    path: "image_list",
                    name: "image_list",
                    component: () => import("../views/admin/image_mgr/image_list.vue")
                },
                {
                    path: "advert_list",
                    name: "advert_list",
                    component: () => import("../views/admin/advert_mgr/advert_list.vue")
                },
                {
                    path: "menu_list",
                    name: "menu_list",
                    component: () => import("../views/admin/menu_mgr/menu_list.vue")
                },
                {
                    path: "log_list",
                    name: "log_list",
                    component: () => import("../views/admin/log_mgr/log_list.vue")
                },
                {
                    path: "system_list",
                    name: "system_list",
                    component: () => import("../views/admin/system_mgr/system_list.vue")
                }
            ]
        }
    ]
})

export default router

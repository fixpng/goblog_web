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
                    path: "chat_list",
                    name: "chat_list",
                    component: () => import("../views/admin/chat_list.vue")
                },
                {
                    path: "message_list",
                    name: "message_list",
                    component: () => import("../views/admin/message_list.vue")
                },
                {
                    path: "tag_list",
                    name: "tag_list",
                    component: () => import("../views/admin/tag_list.vue")
                },
                {
                    path: "article_list",
                    name: "article_list",
                    component: () => import("../views/admin/article_mgr/article_list.vue")
                },
                {
                    path: "add_article",
                    name: "add_article",
                    component: () => import("../views/admin/article_mgr/add_article.vue")
                },
                {
                    path: "system",
                    name: "system",
                    component:()=>import("@/views/admin/system_mgr/system_base.vue"),
                    children: [
                        {
                            path: "site",
                            name: "system_site",
                            component: () => import("../views/admin/system_mgr/site_setting.vue")
                        },
                        {
                            path: "email",
                            name: "system_email",
                            component: () => import("../views/admin/system_mgr/email_setting.vue")
                        },
                        {
                            path: "qiniu",
                            name: "system_qiniu",
                            component: () => import("../views/admin/system_mgr/qiniu_setting.vue")
                        },
                        {
                            path: "qq",
                            name: "system_qq",
                            component: () => import("../views/admin/system_mgr/qq_setting.vue")
                        },
                        {
                            path: "jwt",
                            name: "system_jwt",
                            component: () => import("../views/admin/system_mgr/jwt_setting.vue")
                        },
                    ]
                }
            ]
        }
    ]
})

export default router

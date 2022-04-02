import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Cauldron from "@/views/cauldron/cauldron-in/cauldron-in-front-page/CauldronInFrontPage.vue"
import Message from "@/views/message/message-front-page/MessageFrontPage.vue"
import Front from "@/views/FrontPage.vue"
import SubFront from "@/views/SubFrontPage.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/front",
    },
    {
        path: "/front",
        name: "front",
        component: Front,
        meta: { keepAlive: true },
        children: [
            { path: "/front", redirect: "/front/cauldron" },
            {
                path: "/front/cauldron",
                name: "cauldron",
                component: Cauldron,
                meta: { keepAlive: true },
            },
            {
                path: "/front/friends",
                name: "friends",
                component: () => import("@/views/friends/FriendsFrontPage.vue"),
                meta: { keepAlive: true },
            },
            {
                path: "/front/message",
                name: "message",
                component: Message,
                meta: { keepAlive: true },
            },
            {
                path: "/front/home",
                name: "home",
                meta: { keepAlive: true },

                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "@/views/home/HomeFrontPage.vue"
                    ),
            },
        ],
    },
    {
        path: "/sub-front",
        name: "subFront",
        meta: { keepAlive: true },
        component: SubFront,
        children: [
            {
                path: "/sub-front/team-square",
                name: "teamSquare",
                component: () =>
                    import(
                        "@/views/friends/team-square/TeamSquareSubFrontPage.vue"
                    ),
            },
            {
                path: "/sub-front/night-chat",
                name: "nightChat",
                component: () =>
                    import(
                        "@/views/friends/night-chat/NightChatSubFrontPage.vue"
                    ),
            },
            {
                path: "/sub-front/seven-day-mates",
                name: "sevenDayMates",
                component: () =>
                    import(
                        "@/views/friends/seven-day-mates/SevenDayMatesSubFrontPage.vue"
                    ),
            },
            {
                path: "/sub-front/winter-doll-machine",
                name: "winterDollMachine",
                component: () =>
                    import(
                        "@/views/friends/winter-doll-machine/WinterDollMachineSubFrontPage.vue"
                    ),
            },
            {
                path: "/sub-front/mbti-test",
                name: "mbtiTest",
                component: () =>
                    import("@/views/home/mbti-test/MBTITestSubFrontPage.vue"),
            },
            {
                path: "/sub-front/course",
                name: "course",
                component: () =>
                    import("@/views/home/course-notes/CourseNotesSubFrontPage.vue"),
            },
        ],
    },
    {
        path: "/detail",
        name: "detail",
        component: () => import("@/views/DetailPage.vue"),
        children: [
            {
                path: "/detail/post/:pid",
                name: "post",
                component: () =>
                    import(
                        "@/views/cauldron/cauldron-in/cauldron-in-detail-page/CauldronInDetailPage.vue"
                    ),
            },
        ],
    },
    {
        path: "/search",
        name: "search",
        component: () => import("@/views/SearchPage.vue"),
        children: [
            {
                path: "/search/cauldron",
                name: "searchHotSpot",
                component: () =>
                    import(
                        "@/views/cauldron/cauldron-in/cauldron-in-search-page/CauldronInSearchPage.vue"
                    ),
            },
        ],
    },
    {
        path: "/edit",
        name: "edit",
        component: () => import("@/views/EditPage.vue"),
        children: [
            {
                path: "/edit/post",
                name: "editInPost",
                component: () =>
                    import(
                        "@/views/cauldron/cauldron-in/cauldron-in-edit-page/CauldronInEditPage.vue"
                    ),
            },
            {
                path: "/edit/post",
                name: "editOutPost",
                component: () =>
                    import(
                        "@/views/cauldron/cauldron-out/blue-whale-edit-page/BlueWhaleEditPage.vue"
                    ),
            },
            {
                path: "/edit/init-team",
                name: "initTeam",
                component: () =>
                    import("@/views/friends/team-square/TeamInitEditPage.vue"),
            },
            {
                path: "/edit/join-team/:tid",
                name: "joinTeam",
                component: () =>
                    import("@/views/friends/team-square/TeamJoinEditPage.vue"),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

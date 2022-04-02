<template>
    <div class="cauldron">
        <div class="search_area">
            <SwitchBar />
        </div>
        <div class="refresh_area" :style="refreshBoxStyle">
            <div v-show="refreshState === 'before'" class="before_refresh">
                <div class="refresh_icon"></div>
                <span class="refresh_text">下拉刷新</span>
            </div>
            <div v-show="refreshState === 'ready'" class="ready_refresh">
                <div class="refresh_icon"></div>
                <span class="refresh_text">松开刷新</span>
            </div>
            <div v-show="refreshState === 'doing'" class="doing_refresh">
                <div class="refresh_icon"></div>
                <span class="refresh_text">正在刷新</span>
            </div>
            <div v-show="refreshState === 'done'" class="after_refresh">
                <div class="refresh_icon"></div>
                <span class="refresh_text">完成刷新</span>
            </div>
        </div>
        <div
            class="content_area"
            @touchstart="recordTouchStart"
            @touchmove="showRefreshSpring"
            @touchend="refreshFrontPage"
            @scroll="addNewPosts"
        >
            <DistrictSwitcher />
            <PostInBrief
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @post-action-success="updateActionState"
            ></PostInBrief>
            <div class="addition_area">
                <div v-show="additionState === 'before'" class="before_addition">
                    <div class="refresh_icon"></div>
                    <span class="refresh_text">加载更多</span>
                </div>
                <div v-show="additionState === 'doing'" class="doing_addition">
                    <div class="refresh_icon"></div>
                    <span class="refresh_text">正在加载</span>
                </div>
                <div v-show="additionState === 'done'" class="after_addition">
                    <div class="refresh_icon"></div>
                    <span class="refresh_text">加载完成</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SwitchBar from "./search-entry/SwitchBar.vue"
import PostInBrief from './post-in-brief/PostInBrief.vue'
import DistrictSwitcher from "./district-switcher/DistrictSwitcher.vue"
import axios from "axios"
import { PostParamsInBrief } from "@/views/cauldron/cauldron"
import { reactive, toRefs } from 'vue'
import { useUserStore } from "@/store/user"
const userStore = useUserStore()
const data = reactive({
    posts: [] as PostParamsInBrief[],
    touch: {
        y_start: 0,
        y_end: 0
    },
    refreshBoxStyle: {
        height: '0px'
    },
    editEntryStyle: {
        left: '0px',
        top: '0px'
    },
    refreshState: "before" as "before" | "ready" | "doing" | "done",
    additionState: "before" as "before" | "doing" | "done"
})
let { posts, refreshBoxStyle, refreshState, additionState } = toRefs(data)

getPosts()

function getPosts() {
    axios
        .get(`${userStore.ip}:3000/index/cauldron_front?uid=${userStore.uid}`)
        .then((res) => {
            let cauldron = res.data
            data.posts = cauldron.posts as PostParamsInBrief[]
        })
}

function updateActionState(id: number, type: "likePost" | "cancelLike" | "dislikePost" | "cancelDislike") {
    let target = data.posts.find((post) => post.id === id) as PostParamsInBrief
    switch (type) {
        case "likePost": {
            target.like += 1
            target.is_liked = true
            break
        }
        case "cancelLike": {
            target.like -= 1
            target.is_liked = false
            break
        }
        case "dislikePost": {
            target.dislike += 1
            target.is_disliked = true
            break
        }
        case "cancelDislike": {
            target.dislike -= 1
            target.is_disliked = false
            break
        }
    }
}

function recordTouchStart(event: TouchEvent) {
    if ((event.currentTarget as HTMLElement).scrollTop === 0) {
        data.touch.y_start = event.targetTouches[0].pageY
    }
}

function showRefreshSpring(event: TouchEvent) {
    if ((event.currentTarget as HTMLElement).scrollTop === 0) {
        const pullDistance = event.targetTouches[0].pageY - data.touch.y_start
        data.refreshBoxStyle.height = `${(pullDistance) / 2}px`
        if (pullDistance > 140) {
            data.refreshState = "ready"
        } else {
            data.refreshState = "before"
        }
    }
}

function refreshFrontPage(event: TouchEvent) {
    if ((event.currentTarget as HTMLElement).scrollTop === 0) {
        data.touch.y_end = event.changedTouches[0].pageY
        if (data.touch.y_end - data.touch.y_start > 140) {
            data.refreshState = "doing"
            data.refreshBoxStyle.height = '70px'
            axios
                .get(`${userStore.ip}:3000/index/cauldron_front?uid=${userStore.uid}`)
                .then((res) => {
                    let cauldron = res.data
                    data.posts = cauldron.posts as PostParamsInBrief[]
                    data.touch.y_start = 0
                    data.touch.y_end = 0
                    data.refreshState = "done"
                    setTimeout(() => {
                        data.refreshBoxStyle.height = '0px'
                        data.refreshState = "before"
                    }, 500);
                })
        }
        else {
            data.refreshBoxStyle.height = '0px'
        }
    }
}

function addNewPosts(event: UIEvent) {
    let target = event.currentTarget as HTMLElement
    if (target.scrollHeight - (target.scrollTop + target.clientHeight) < 200) {
        data.additionState = "doing"
        axios
            .get(`${userStore.ip}:3000/index/cauldron_front?uid=${userStore.uid}`)
            .then((res) => {
                let cauldron = res.data
                data.posts = [...data.posts, ...cauldron.posts as PostParamsInBrief[]]
                data.additionState = "done"
                setTimeout(() => {
                    data.additionState = "before"
                }, 500);
            })
    }
}
</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 24px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.cauldron {
    height: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.search_area {
    flex: 0;
}
.refresh_area {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.content_area {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
}
.content_area::-webkit-scrollbar {
    display: none;
}
.edit_entry {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 25px;
    color: #70a1ff;
    background-color: white;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
    position: absolute;
    bottom: 20%;
    right: 10%;
}

.addition_area {
    height: 200px;
    background-color: aliceblue;
}
</style>
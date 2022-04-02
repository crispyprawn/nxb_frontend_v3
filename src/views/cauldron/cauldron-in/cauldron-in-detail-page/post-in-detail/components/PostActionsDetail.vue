<template>
    <div class="post_actions">
        <div class="post_action" @click="emits('replyToPost')">
            <div class="post_action_icon icon_comment">
                <i class="iconfont">&#xe607;</i>
            </div>
            <div class="post_action_info">{{ post.comments.length }}</div>
        </div>

        <div v-show="!post.is_subscribed" class="post_action" @click="subscribePost">
            <div class="post_action_icon icon_subscribe">
                <i class="iconfont">&#xe96e;</i>
            </div>
            <div class="post_action_info">{{ post.subscriptions }}</div>
        </div>

        <div v-show="post.is_subscribed" class="post_action" @click="cancelSubscribe">
            <div class="post_action_icon icon_subscribe">
                <i class="iconfont">&#xe96d;</i>
            </div>
            <div class="post_action_info">{{ post.subscriptions }}</div>
        </div>

        <div v-show="!post.is_disliked" class="post_action" @click="expandCollapseReasons">
            <div class="post_action_icon icon_dislike">
                <i class="iconfont">&#xe659;</i>
            </div>
            <div class="post_action_info">{{ post.dislike }}</div>
        </div>
        <div v-show="post.is_disliked" class="post_action" @click="cancelDislike">
            <div class="post_action_icon icon_dislike">
                <i class="iconfont">&#xe665;</i>
            </div>
            <div class="post_action_info">{{ post.dislike }}</div>
        </div>

        <div v-show="!post.is_liked" class="post_action" @click="likePost">
            <div class="post_action_icon icon_like">
                <i class="iconfont">&#xe660;</i>
            </div>
            <div class="post_action_info">{{ post.like }}</div>
        </div>
        <div v-show="post.is_liked" class="post_action" @click="cancelLike">
            <div class="post_action_icon icon_like">
                <i class="iconfont">&#xe666;</i>
            </div>
            <div class="post_action_info">{{ post.like }}</div>
        </div>
    </div>

    <div v-show="showDislikeReasons" class="dislike_reason">
        <div class="title">选择你标记反对的原因</div>
        <div class="reason_list">
            <div
                v-for="(reason, index) in reasons"
                :key="index"
                @click="dislikePost(reason)"
            >{{ reason }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios"
import { PostParamsInDetail } from '@/views/cauldron/cauldron'
import { useUserStore } from '@/store/user'
import { reactive, toRefs } from 'vue'
const props = defineProps<{
    post: PostParamsInDetail
}>()
const emits = defineEmits<{
    (event: 'reloadPost'): void,
    (event: 'replyToPost'): void
}>()

const data = reactive({
    showDislikeReasons: false,
    reasons: ["恶意钓鱼", "政治敏感", "强烈不适", "造谣生事", "言辞过激", "侵犯名誉"]
})
let { showDislikeReasons, reasons } = toRefs(data)
let userStore = useUserStore()

function expandCollapseReasons() {
    data.showDislikeReasons = !data.showDislikeReasons
}

function likePost() {
    axios.post(`${userStore.ip}:3000/post&action=like&target=post`, {
        uid: userStore.uid,
        pid: props.post.id
    })
        .then((response) => {
            if (response.data.message_code === 1) {
                emits('reloadPost')
            }
        })
}
function cancelLike() {
    axios.post(`${userStore.ip}:3000/post&action=cancel_like&target=post`, {
        uid: userStore.uid,
        pid: props.post.id
    })
        .then((response) => {
            if (response.data.message_code === 1) {
                emits('reloadPost')
            }
        })
}

function dislikePost(dislikeType: string) {
    axios.post(`${userStore.ip}:3000/post&action=dislike&target=post`, {
        uid: userStore.uid,
        pid: props.post.id,
        type: dislikeType
    })
        .then((response) => {

            if (response.data.message_code === 1) {
                data.showDislikeReasons = false
                emits('reloadPost')
            }
        })
}

function cancelDislike() {
    axios.post(`${userStore.ip}:3000/post&action=cancel_dislike&target=post`, {
        uid: userStore.uid,
        pid: props.post.id
    })
        .then((response) => {
            if (response.data.message_code === 1) {
                emits('reloadPost')
            }
        })
}

function subscribePost() {
    axios.post(`${userStore.ip}:3000/post&action=subscribe&target=post`, {
        uid: userStore.uid,
        pid: props.post.id
    })
        .then((response) => {
            if (response.data.message_code === 1) {
                emits('reloadPost')
            }
        })
}

function cancelSubscribe() {
    axios.post(`${userStore.ip}:3000/post&action=cancel_subscribe&target=post`, {
        uid: userStore.uid,
        pid: props.post.id
    })
        .then((response) => {
            if (response.data.message_code === 1) {
                emits('reloadPost')
            }
        })
}
</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

.post_actions {
    display: flex;
    width: 100%;
    padding: 4px 0px;
}
.post_action {
    min-width: 30px;
    line-height: 30px;
    flex: 1;
    display: flex;
}
.post_action_icon {
    width: 30px;
    height: 30px;
}
</style>
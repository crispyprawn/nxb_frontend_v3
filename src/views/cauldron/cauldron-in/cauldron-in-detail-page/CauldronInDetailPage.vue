<template>
    <div class="page_container">
        <div class="header">
            <Toolbar @go-back="goBack" :title="title" />
        </div>

        <div v-if="loaded" class="cauldron">
            <div class="post_detail">
                <div
                    class="mask"
                    v-show="editorSetting.focused"
                    @click="blurCommentEditor"
                    @touchmove.prevent
                ></div>
                <div class="content">
                    <PostInDetail
                        :post="post"
                        @reply-to-comment="replyToStorey"
                        @reply-to-post="focusCommentEditor"
                        @reload-post="getPostDetail"
                    />
                </div>
            </div>
            <div class="comment_editor" @click="focusCommentEditor">
                <PostCommentEditor
                    @submit-comment="sendWrittenComment"
                    @edit-signature="editSignature"
                    v-model:message="reply.message"
                    v-model:signature="reply.signature"
                    :reply-prefix="reply.prefix"
                    :rich-text-invoked="editorSetting.richTextInvoked"
                    :focused="editorSetting.focused"
                    v-show="editorSetting.mode === 'comment'"
                />
                <PostSignatureEditor
                    @finish-edit="finishEditSignature"
                    v-show="editorSetting.mode === 'signature'"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import dayjs from 'dayjs';
import PostInDetail from '@/views/cauldron/cauldron-in/cauldron-in-detail-page/post-in-detail/PostInDetail.vue';
import PostCommentEditor from './text-editor/PostCommentEditor.vue'
import PostSignatureEditor from './text-editor/PostSignatureEditor.vue';
import Toolbar from '@/components/Toolbar.vue';
import { PostParamsInDetail } from '../../cauldron';
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const data = reactive({
    loaded: false,
    postId: route.params.pid,
    reply: {
        prefix: '',
        message: '',
        signature: '',
        root: 0,
        parent: 0
    },
    editorSetting: {
        richTextInvoked: false,
        focused: false,
        mode: "comment" as "comment" | "signature"
    },
    post: {} as PostParamsInDetail,
    title: 'loading...'
})
let { loaded, postId, reply, editorSetting, post, title } = toRefs(data)
getPostDetail()


function getPostDetail() {
    axios.get(`${userStore.ip}:3000/detail/cauldron_detail?pid=${data.postId}&uid=${userStore.uid}`)
        .then((response) => {
            data.post = response.data as PostParamsInDetail
            data.title = '#' + data.post.id
            data.loaded = true
        })
}
function sendWrittenComment() {
    axios.post(`${userStore.ip}:3000/post&action=comment`, {
        pid: +data.postId,
        time: dayjs().unix(),
        root: data.reply.root,
        parent: data.reply.parent,
        message: data.reply.message,
        signature: data.reply.signature,
    }).then((response) => {
        data.reply.message = ''
        blurCommentEditor()
        getPostDetail()
    })
}
function replyToStorey(storey: number, root: number, parent: number) {
    data.reply.root = root
    data.reply.parent = parent
    data.reply.prefix = `回复${storey}楼：`
    data.editorSetting.focused = true
    data.editorSetting.richTextInvoked = true
}

function focusCommentEditor() {
    data.editorSetting.richTextInvoked = true
    data.editorSetting.focused = true
}
function blurCommentEditor() {
    data.editorSetting.richTextInvoked = false
    data.editorSetting.focused = false
    if (data.reply.message.length === 0) {
        data.reply.root = 0
        data.reply.parent = 0
        data.reply.prefix = ''
    }
}
function editSignature() {
    data.editorSetting.mode = "signature"
}
function finishEditSignature() {
    data.editorSetting.mode = "comment"
}
function goBack() {
    router.back()
}

</script>



<style scoped>
.page_container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.header {
    flex: none;
}
.cauldron {
    flex: 1;
    padding: 0px 20px;
    display: flex;
    height: 0;
    flex-direction: column;
}
.post_detail {
    flex: 1;
    height: 0;
    position: relative;
}
.content {
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
}
.content::-webkit-scrollbar {
    display: none;
}
.comment_editor {
    flex: none;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
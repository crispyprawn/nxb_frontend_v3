<template>
    <div class="comment_container">
        <div class="info">
            <span class="storey">{{ storey }}楼</span>
            <span class="time">{{ useTimeFormatter(comment.time, "reply_relative") }}</span>
        </div>
        <div class="message" @click="replyToComment(storey, comment)">
            <span>{{ prefix }}</span>
            <span>{{ comment.message }}</span>
        </div>
        <div class="additional_info">
            <div class="signature">{{ useDefaultSignature(comment.signature) }}</div>
            <div class="reply_actions">
                <i class="reply_comment iconfont" @click="replyToComment(storey, comment)">&#xe60f;</i>
                <i class="like_comment iconfont">&#xe660;</i>
                <span v-show="comment.like > 0">{{ comment.like }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useTimeFormatter from '@/views/cauldron/hooks/useTimeFormatter'
import useDefaultSignature from '@/views/cauldron/hooks/useDefaultSignature'
import { Comment } from '@/views/cauldron/cauldron'
const props = defineProps<{
    storey: number,
    prefix: string,
    comment: Comment
}>()
const emits = defineEmits<{
    (event: 'replyToComment',
        replyToStorey: number,
        root: number, parent: number): void
}>()
function replyToComment(storey: number, comment: Comment) {
    if (comment.root === 0) {
        emits('replyToComment', storey, comment.rpid, comment.rpid)
    }
    else {
        emits('replyToComment', storey, comment.root, comment.rpid)
    }
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
    padding: 5px;
}
.comment_container {
    text-align: left;
    padding: 4px 0px;
    font-size: 14px;
}
.time {
    padding: 0px 10px;
}
.signature {
    font-size: 13px;
    height: 20px;
    line-height: 20px;
}

.additional_info {
    display: flex;
    justify-content: space-between;
    padding: 4px 0px;
}
</style>
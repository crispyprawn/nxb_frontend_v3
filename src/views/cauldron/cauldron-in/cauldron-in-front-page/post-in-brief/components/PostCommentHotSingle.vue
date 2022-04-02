<template>
    <div class="comment_container">
        <div class="message" @click="emits('gotoDetailPage')">{{ comment.message }}</div>
        <div class="additional_info">
            <div class="signature">{{ useDefaultSignature(comment.signature) }}</div>
            <div class="reply_actions">
                <i class="like_comment iconfont">&#xe660;</i>
                <span>{{ comment.like }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useDefaultSignature from '@/views/cauldron/hooks/useDefaultSignature'
import { HotComment } from '@/views/cauldron/cauldron'
const props = defineProps<{
    comment: HotComment
}>()
const emits = defineEmits<{
    (event: 'gotoDetailPage'): void
}>()
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
}

.additional_info {
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
}
</style>
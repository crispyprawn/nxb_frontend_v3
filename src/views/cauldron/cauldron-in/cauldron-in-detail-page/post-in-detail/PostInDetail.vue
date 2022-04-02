<template>
    <PostInfoDetail :post="post" />
    <PostTextFull :content="post.content" />
    <PostAttention :views="post.views" :hot-spot-index="post.hot_spot_index" :tags="post.tags" />
    <PostActionsDetail
        :post="post"
        @reload-post="emits('reloadPost')"
        @reply-to-post="emits('replyToPost')"
    />
    <PostCommentAllSingle
        v-for="(comment, index) in post.comments"
        :comment="comment"
        :storey="index + 1"
        :prefix="commentPrefix(comment.parent, post.comments)"
        :key="comment.rpid"
        @reply-to-comment="replyToComment"
    />
</template>

<script setup lang="ts">
import PostInfoDetail from './components/PostInfoDetail.vue'
import PostTextFull from './components/PostTextFull.vue'
import PostAttention from './components/PostAttention.vue'
import PostActionsDetail from './components/PostActionsDetail.vue'
import PostCommentAllSingle from './components/PostCommentAllSingle.vue';
import { PostParamsInDetail, Comment } from '@/views/cauldron/cauldron'
const props = defineProps<{
    post: PostParamsInDetail,
}>()
const emits = defineEmits<{
    (event: 'replyToComment', storey: number, root: number, parent: number): void,
    (event: 'replyToPost'): void,
    (event: 'reloadPost'): void
}>()
function replyToComment(storey: number, root: number, parent: number) {
    emits('replyToComment', storey, root, parent)
}
function commentPrefix(parent: number, list: Comment[]) {
    let storey = list.findIndex((comment) => comment.rpid === parent) + 1
    return storey === 0 ? "" : `回复${storey}楼：`
}
</script>

<style scoped>
</style>
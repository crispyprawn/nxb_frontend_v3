<template>
    <div class="brief">
        <PostInfo :post="post" />
        <PostTextLimited :content="post.content" @goto-detail-page="goToDetailPage" />
        <PostActionsBrief
            :post="post"
            @goto-detail-page="goToDetailPage"
            @like-post="emits('postActionSuccess', post.id, 'likePost')"
            @cancel-like="emits('postActionSuccess', post.id, 'cancelLike')"
            @dislike-post="emits('postActionSuccess', post.id, 'dislikePost')"
            @cancel-dislike="emits('postActionSuccess', post.id, 'cancelDislike')"
        />
        <PostCommentHotSingle
            v-for="comment in post.hot_comments"
            :comment="comment"
            :key="comment.rpid"
            @goto-detail-page="goToDetailPage"
        />
    </div>
</template>

<script setup lang="ts">
import PostInfo from './components/PostInfo.vue';
import PostTextLimited from './components/PostTextLimited.vue';
import PostActionsBrief from './components/PostActionsBrief.vue';
import PostCommentHotSingle from './components/PostCommentHotSingle.vue';
import { PostParamsInBrief } from '@/views/cauldron/cauldron'
import { useRouter } from 'vue-router'
const props = defineProps<{
    post: PostParamsInBrief
}>()
const emits = defineEmits<{
    (event: 'postActionSuccess', id: number, type: "likePost" | "cancelLike" | "dislikePost" | "cancelDislike"): void
}>()

const router = useRouter()
function goToDetailPage() {
    router.push({
        name: 'post',
        params: {
            pid: props.post.id
        }
    })
}
</script>

<style scoped>
.brief {
    margin-top: 10px;
}
</style>
<template>
    <!-- 搜索结果 -->
    <div class="search_result_container">
        <div class="search_mode_switch_bar">
            <span
                class="search_mode"
                @click="selectSearchMode('latest')"
            >最新</span>
            <span class="search_mode" @click="selectSearchMode('hottest')">最热</span>
        </div>
        <div class="search_result_list">            
            <PostInBrief v-for="post in posts" :post="post" :key="post.id"></PostInBrief>
        </div>
        <div class="loader_container">
            
            <div class="weui-loadmore" id="loadingDrafts">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载中...</span>
            </div>
            <div class="weui-loadmore" id="loadingFinished">已经没有更多了</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PostParamsInBrief } from '@/views/cauldron/cauldron'
import PostInBrief from '@/views/cauldron/cauldron-in/cauldron-in-front-page/post-in-brief/PostInBrief.vue'
const props = defineProps<{
    posts: PostParamsInBrief[]
}>()
function selectSearchMode(mode: "latest" | "hottest"): void {
    return
}
</script>

<style scoped>
</style>
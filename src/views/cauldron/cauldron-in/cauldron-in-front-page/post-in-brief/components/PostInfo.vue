<template>
    <div class="post_info">
        <div class="post_info_avatar"></div>
        <div class="post_info_publish">
            <div class="post_info_cat_name">{{ post.cat_name }}</div>
            <div class="post_info_time">{{ useTimeFormatter(post.time, 'front_relative') }}</div>
        </div>
        <div class="post_info_mark">
            <div class="post_info_id">#{{ post.id }}</div>
        </div>
    </div>
    <div v-show="post.most_dislike_count > 0" class="post_caution">
        <i class="iconfont">&#xe61f;</i>
        <span>{{ post.most_dislike_count }}人标记为{{ post.most_dislike_type }}</span>
    </div>
</template>

<script setup lang="ts">
import { PostParamsInBrief } from '@/views/cauldron/cauldron';
import useTimeFormatter from '@/views/cauldron/hooks/useTimeFormatter'
const props = defineProps<{
    post: PostParamsInBrief
}>()
</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    padding: 0px 5px;
}
.post_info {
    display: flex;
}
.post_info_avatar {
    flex: none;
    background-color: antiquewhite;
    width: 50px;
    height: 50px;
}
.post_info_publish {
    flex: 1;
}
.post_info_cat_name {
    text-align: left;
}
.post_info_time {
    text-align: left;
}
.post_info_id {
    flex: none;
    width: 70px;
    font-size: 16px;
    background-color: red;
    text-align: left;
    line-height: 16px;
}
.post_caution {
    text-align: left;
    background-color: rgb(253, 233, 206);
    color: rgb(255, 159, 70);
    border-radius: 3px;
    margin-top: 5px;
}
</style>
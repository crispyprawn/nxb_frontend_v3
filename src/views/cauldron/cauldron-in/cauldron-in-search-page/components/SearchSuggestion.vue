<template>
    <!-- 热门推荐 -->
    <div class="posts_search_suggestion_container">
        <div class="posts_search_suggestion_title">搜索发现</div>
        <div class="posts_search_explore">
            <div class="posts_search_explore_keyword" v-for="(topic, i) in explore" :key="i">
                <span @click="emits('setSearchText', topic)">{{ topic }}</span>
                <span class="hot_tag">{{ tagName(i + 1) }}</span>
            </div>
        </div>
        <div class="posts_search_suggestion_title">大家都在搜</div>
        <div class="posts_search_common">
            <div v-for="(search, i) in common" :key="i">
                <span :class="rankName(i + 1)" class="rank">{{ i + 1 }}</span>
                <span @click="emits('setSearchText', search.topic)">{{ search.topic }}</span>
                <i class="iconfont"></i>
                <span>热度：{{ search.hot_spot_index }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { SearchHotSpot } from '@/views/cauldron/cauldron'
import { reactive, toRefs } from 'vue'
const emits = defineEmits<{
    (event: 'setSearchText', text: string): void
}>()

const data = reactive({
    explore: [] as string[],
    common: [] as SearchHotSpot[]
})

let { explore, common } = toRefs(data)

getSearchSuggestion()

function getSearchSuggestion() {
    axios.post('http://192.168.10.11:3000/search/cauldron&type=suggestion')
        .then((response) => {
            let suggestion = response.data
            data.explore = suggestion.explore
            data.common = suggestion.common
        })
}

function tagName(topicRank: number) {
    if (topicRank === 1)
        return "热门"
    else if (topicRank <= 4)
        return "new"
    else if (topicRank >= 7)
        return "荐"
    else return ""
}
function rankName(topicRank: number) {
    if (topicRank === 1)
        return "first"
    else if (topicRank === 2)
        return "second"
    else if (topicRank === 3)
        return "third"
}
</script>

<style scoped>
.posts_search_suggestion_container {
    text-align: left;
}
.posts_search_explore {
    display: flex;
    flex-wrap: wrap;
}
.posts_search_explore_keyword {
    flex: none;
    width: 50%;
}

.hot_tag:nth-of-type(1) {
    background-color: coral;
}
/* .hot_tag:nth-of-type(2),
.hot_tag:nth-of-type(3),
.hot_tag:nth-of-type(4) {
    background-color: rgb(255, 170, 0);
} */

.first {
    background-color: rgb(230, 0, 0);
}
.second {
    background-color: rgb(255, 80, 0);
}
.third {
    background-color: coral;
}
</style>
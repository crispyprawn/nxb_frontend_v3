<template>
    <div class="popularity">
        <div class="views">阅读人数：{{ views }}</div>
        <div class="hot_spot_index">24小时热度：{{ hotSpotIndex }}</div>
    </div>
    <div class="tags">
        <div>相关tags：</div>
        <div v-for="(tag, index) in tags" :key="index">
            <span v-show="index > 0">/</span>
            <span class="tag" @click="goSearchTag(tag)">{{ tag }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

const props = defineProps<{
    views: number,
    hotSpotIndex: number,
    tags: string[]
}>()

function goSearchTag(tag: string) {
    router.push({
        name: 'searchHotSpot',
        query: {
            keyword: tag
        }
    })
}
</script>

<style scoped>
.popularity {
    display: flex;
    justify-content: space-between;
}
.tags {
    display: flex;
}
</style>
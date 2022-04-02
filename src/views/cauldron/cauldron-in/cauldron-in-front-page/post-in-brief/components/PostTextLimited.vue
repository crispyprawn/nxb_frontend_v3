<template>
    <div :class="isFolded ? 'post_text_folded' : 'post_text_unfolded'" @click="$emit('gotoDetailPage')">{{ content }}</div>
    <div class="post_text_unfold" @click="changeFoldState">{{ isFolded ? "展开" : "收起" }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    content: string,
}>()
const emit = defineEmits<{
  (e: 'gotoDetailPage'): void
}>()
let isFolded = ref(true)
function changeFoldState() {
    isFolded.value = !isFolded.value
}


</script>

<style scoped>
.post_text_folded {
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    text-align: left;
}
.post_text_unfolded {
    font-size: 15px;
    width: 100%;
    white-space: pre-wrap;
    text-align: left;
}
.post_paragraph {
    width: 100%;
    font-size: 14px;
}
.post_text_unfold {
    color: rgb(24, 97, 255);
    float: left;
    clear: both;
    font-size: 15px;
}
</style>
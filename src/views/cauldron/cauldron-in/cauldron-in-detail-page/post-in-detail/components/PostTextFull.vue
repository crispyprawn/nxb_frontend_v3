<template>
    <div class="post_text">{{ content }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
    content: string,
}>()
</script>

<style scoped>
.post_text {
    width: 100%;
    white-space: pre-wrap;
    text-align: left;
    font-size: 15px;
}
</style>
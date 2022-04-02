<template>
    <div class="toolbar">
        <div class="return" @click="emits('goBack')">
            <i class="iconfont">&#xe610;</i>
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
const emits = defineEmits<{
    (event: 'goBack'): void
}>()
</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    color: #75a5ff;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.return {
    width: 42px;
    height: 42px;
    line-height: 42px;
    background-color: aquamarine;
}
.toolbar{
    display: flex;
}
.title{
    font-size: 30px;
    line-height: 42px;

}
</style>
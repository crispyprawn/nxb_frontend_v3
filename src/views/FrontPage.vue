<template>
    <div class="router">
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
    </div>
    <div class="footer">
        <NavigateBar @invoke-editor="showEditorEntry" />
    </div>
    <div class="editor">
        <EditorEntry @hide-editor-entry="hideEditorEntry" :editor-entry-visible="editorEntryVisible" />
    </div>
    <div class="mask" v-show="editorEntryVisible" @click="hideEditorEntry" @touchmove.prevent></div>
    <div class="update_informer"></div>
</template>

<script setup lang="ts">

import NavigateBar from "@/components/NavigateBar.vue"
import EditorEntry from "@/components/EditorEntry.vue"; // @ is an alias to /src

import { reactive, toRefs } from 'vue'

const data = reactive({
    editorEntryVisible: false
})

let { editorEntryVisible } = toRefs(data)

function showEditorEntry() {
    data.editorEntryVisible = true
}

function hideEditorEntry() {
    data.editorEntryVisible = false
}
</script>

<style scoped>
.router {
    flex: 1;
    overflow-y: hidden;
}
.footer {
    flex: none;
}
.editor {
    position: relative;
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 16;
    background-color: rgba(255, 169, 169, 0.1);
}
</style>
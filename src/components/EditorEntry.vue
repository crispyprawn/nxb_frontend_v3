<template>
    <div class="editor_entry" :class="editorEntryVisible ? 'show' : 'hide'">
        <div class="entry_option" @click="gotoEditPage('editInPost')">鼎里投稿</div>
        <div class="entry_option" @click="gotoEditPage('editOutPost')">鼎外投稿</div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()

const props = defineProps<{
    editorEntryVisible: boolean
}>()
const emits = defineEmits<{
    (event: 'hideEditorEntry'): void
}>()

function gotoEditPage(to: "editInPost" | "editOutPost") {
    emits('hideEditorEntry')
    router.push({
        name: to
    })
}
</script>

<style scoped>
.editor_entry {
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0;
    background-color: #57ff35;
    z-index: 20;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.editor_entry.hide {
    transform: translateY(200px);
}

.entry_option {
    width: 100px;
    height: 50px;
    border-radius: 10px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
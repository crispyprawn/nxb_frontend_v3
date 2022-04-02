<template>
    <div class="posts_search_history_container">
        <div class="title">历史记录</div>
        <div class="posts_search_history">
            <div
                v-for="(text, i) in history"
                @click="emits('setSearchText', text)"
                :key="i"
            >{{ text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'

const emits = defineEmits<{
    (event: 'setSearchText', history: string): void
}>()
let history = reactive([] as string[])

getSearchHistory()

function getSearchHistory() {
    axios.post('http://192.168.10.11:3000/search/cauldron&type=history')
        .then((response) => {
            history = response.data.history
        })
}

</script>

<style scoped>
.posts_search_history_container {
    text-align: left;
}
</style>
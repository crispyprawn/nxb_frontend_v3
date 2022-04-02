<template>
    <div class="search_entry_container">
        <div class="search_bar">
            <div class="search_icon">
                <i class="iconfont">&#xe66d;</i>
            </div>
            <div class="search_input">
                <input
                    class="search_text"
                    placeholder="输入投稿号或关键词"
                    :value="userInput"
                    @input="emits('update:userInput', ($event.target as HTMLInputElement).value)"
                    type="text"
                />
            </div>
            <div
                class="clear_icon"
                :class="userInput.length > 0 ? '' : 'opaque'"
                @click="emits('clearSearchText')"
            >
                <i class="iconfont">&#xe64e;</i>
            </div>
        </div>
        <div class="search_button" @click="emits('sendSearchRequest')">搜索</div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    userInput: string
}>()
const emits = defineEmits<{
    (event: 'sendSearchRequest'): void,
    (event: 'clearSearchText'): void,
    (event: 'update:userInput', text: string): void
}>()


</script>

<style lang="less" scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    color: #75a5ff;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.search_entry_container {
    display: flex;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #c6d9fc;
}
.search_bar {
    flex: 1;
    height: 32px;
    border-radius: 16px;
    display: flex;
    background-color: white;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    .search_icon {
        flex: none;
        width: 20px;
        height: 18px;
        padding: 0px 14px;
    }
    .search_input {
        flex: 1;
    }
    .search_text {
        font-size: 15px;
        height: 18px;
        line-height: 18px;
    }
    .clear_icon {
        flex: none;
        width: 20px;
        height: 18px;
        padding: 0px 14px;
        opacity: 1;
    }
    .clear_icon.opaque {
        opacity: 0;
    }
}
.search_button {
    flex: none;
    width: 70px;
    line-height: 32px;
    color: rgb(77, 79, 202);
}
.search_text {
    border: 0px transparent;
    outline: none;
}
</style>
<template>
    <div class="container">
        <div class="user_search_entry">
            <input v-model="searchText" type="text" placeholder="输入UID可以精确查找用户" />
        </div>
        <div class="other_messages">
            <div class="other cauldron_in_messages">鼎里消息</div>
            <div class="other cauldron_out_messages">鼎外消息</div>
            <div class="other flea_market_messages">组队消息</div>
        </div>
        <div class="main_messages">
            <SingleMessageBar
                v-for="dialog in userStore.dialogs"
                :dialog="dialog"
                :key="dialog.uid"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import SingleMessageBar from './components/SingleMessageBar.vue';
import { reactive, toRefs } from 'vue'
import axios from 'axios';
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const data = reactive({
    searchText: ""
})
let { searchText } = toRefs(data)
</script>

<style scoped>
.other_messages {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0px;
}
.other {
    background-color: aliceblue;
    height: 80px;
    width: 80px;
    border-radius: 20px;
    line-height: 80px;
}
</style>
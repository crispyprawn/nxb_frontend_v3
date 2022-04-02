<template>
    <div class="container">
        <div class="entry" @click="switchFriendsModule('teamSquare')">
            <div class="entry_title">组队广场</div>
            <div class="entry_subtitle">独乐乐不如众乐乐</div>
        </div>
        <div class="entry" @click="switchFriendsModule('nightChat')">
            <div class="entry_title">小宝夜聊</div>
            <div class="entry_subtitle">Shared joy is a double joy, shared sorrow is half a sorrow</div>
        </div>
        <div class="entry" @click="switchFriendsModule('sevenDayMates')">
            <div class="entry_title">七日情侣</div>
            <div class="entry_subtitle">曾经有一份真诚的爱情放在我面前</div>
        </div>
        <div class="entry" @click="switchFriendsModule('winterDollMachine')">
            <div class="entry_title">暖冬娃娃机</div>
            <div class="entry_subtitle">希望这只娃娃能在这个寒冷的冬天/带给大家一种/温暖的感觉</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function switchFriendsModule(
    to: "nightChat" | "sevenDayMates" | "teamSquare" | "winterDollMachine"
) {
    router.push({
        name: to
    })
}
</script>

<style scoped>
.container {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    scrollbar-width: none;
}
.container::-webkit-scrollbar {
    width: none;
}
.entry {
    width: 100%;
    height: 120px;
    margin: 20px 0px;
    border-radius: 20px;
    background-color: rgb(205, 255, 238);
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.entry_title {
    font-size: 20px;
}
</style>
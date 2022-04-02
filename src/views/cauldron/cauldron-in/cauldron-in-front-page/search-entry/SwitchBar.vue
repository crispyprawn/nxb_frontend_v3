<template>
    <div class="container">
        <div class="in_out_switcher">
            <div class="cauldron_zone">鼎里</div>
            <div class="cauldron_zone">鼎外</div>
        </div>
        <div class="sort_by_switcher">
            <div class="sort_by">最新</div>
            <div class="sort_by">最热</div>
        </div>
        <div class="search_entry" @click="goToSearchPage">
            <div class="search_icon">
                <i class="iconfont">&#xe66d;</i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function goToSearchPage(){
    router.push({
        name:"searchHotSpot"
    })
}

</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #d3e2ff;
    height: 42px;
    display: flex;
    align-items: center;
}
.in_out_switcher{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
}
.sort_by_switcher{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 2;
}
.search_entry {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    flex: 1;
}
.search_icon {
    flex: 0;
    width: 20px;
    padding: 0px 14px;
}
</style>
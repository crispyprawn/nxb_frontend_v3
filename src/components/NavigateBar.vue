<template>
    <div class="navigate_bar">
        <div class="navigate_option" @click="switchRouter('cauldron')">
            <div class="navigate_icon">
                <i class="iconfont">&#xe66a;</i>
            </div>
            <div class="navigate_text">南鼎</div>
        </div>
        <div class="navigate_option" @click="switchRouter('friends')">
            <div class="navigate_icon">
                <i class="iconfont">&#xe65f;</i>
            </div>
            <div class="navigate_text">友约</div>
        </div>
        <div class="navigate_option" @click="emits('invokeEditor')">
            <div class="navigate_icon new">
                <i class="iconfont">&#xe6a8;</i>
            </div>
        </div>
        <div class="navigate_option" @click="switchRouter('message')">
            <div class="navigate_icon">
                <i class="iconfont">&#xe626;</i>
            </div>
            <div class="navigate_text">消息</div>
        </div>
        <div class="navigate_option" @click="switchRouter('home')">
            <div class="navigate_icon">
                <i class="iconfont">&#xe604;</i>
            </div>
            <div class="navigate_text">个人</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const emits = defineEmits<{
    (event: 'invokeEditor'): void
}>()
const router = useRouter()

function switchRouter(
    to: "cauldron" | "friends" | "message" | "home"
) {
    router.replace({
        name: to
    })
}


</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 22px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.navigate_bar {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    padding: 0px 5px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    background-color: #f1f2f6;
}

.navigate_icon {
    height: 24px;
}
.navigate_option {
    padding: 5px 0px;
    flex: 1;
    min-width: 50px;
    user-select: none;
}

.navigate_option:active {
    background-color: greenyellow;
}
.navigate_text {
    font-size: 12px;
    height: 16px;
}
.navigate_icon.new {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
}
.new .iconfont {
    font-size: 36px;
}

</style>
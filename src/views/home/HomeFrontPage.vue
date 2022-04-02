<template>
    <div class="container">
        <div class="header">
            <div class="profile_switcher">
                <div class="profile">个人主页</div>
                <div class="profile">鼎里主页</div>
                <div class="profile">鼎外主页</div>
            </div>
            <div class="setting_entry">
                <i class="iconfont">&#xe650;</i>
            </div>
        </div>
        <div class="title">
            <div class="avatar"></div>
            <div class="text">
                <div class="nickname">
                    <div class="name">{{ useDefaultNickName(userStore.name) }}</div>
                    <div class="edit_entry">编辑资料</div>
                </div>
                <div class="signature">{{ useDefaultSignature(userStore.signature) }}</div>
            </div>
        </div>
        <br />
        <div class="card">
            <div class="card_info">
                <div class="info_key">UID</div>
                <div class="info_value">{{ userStore.uid }}</div>
            </div>
            <div class="card_info">
                <div class="info_key">性别</div>
                <div class="info_value">{{ userStore.gender }}</div>
            </div>
            <div class="card_info">
                <div class="info_key">爱好</div>
                <div class="info_value">{{ userStore.hobbies }}</div>
            </div>
            <div class="card_info">
                <div class="info_key">生日</div>
                <div class="info_value">{{ userStore.birthday }}</div>
            </div>
            <div class="card_info">
                <div class="info_key">院系</div>
                <div class="info_value">{{ userStore.academy }}</div>
            </div>
            <div class="card_info">
                <div class="info_key">故乡</div>
                <div class="info_value">{{ userStore.hometown }}</div>
            </div>
        </div>
        <br />
        <div class="toolkit">
            <div class="tool_entry" @click="gotoSubFrontPage('mbtiTest')">性格测试</div>
            <div class="tool_entry" @click="gotoSubFrontPage('course')">课程点评</div>
        </div>
        <br />
        <div class="developer_card">
            <div class="card_info">
                <div class="info_key">服务器ip</div>
                <div class="info_value">
                    <span>{{ userStore.ip }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import useDefaultSignature from '@/views/home/hooks/useDefaultSignature'
import useDefaultNickName from '@/views/home/hooks/useDefaultNickname'

const userStore = useUserStore()
const router = useRouter()


function gotoSubFrontPage(to: "mbtiTest" | "course") {
    router.push({
        name: to
    })
}

</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.container {
    width: 100%;
    padding: 0px 20px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    scrollbar-width: none;
}
::-webkit-scrollbar {
    display: none;
}
.header {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
}
.profile_switcher {
    display: flex;
    padding: 0px 5px;
}
.profile {
    width: 70px;
}
.header {
    display: flex;
}
.avatar {
    width: 90px;
    height: 90px;
    margin: 0px 10px;
    border-radius: 50px;
    background-color: orchid;
}
.title {
    display: flex;
}
.nickname {
    display: flex;
    line-height: 40px;
    height: 40px;
}
.edit_entry {
    color: blue;
    font-weight: bold;
    padding: 0px 10px;
}
.toolkit {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 200px;
    border-radius: 20px;
    background-color: rgb(244, 220, 245);
}
.card {
    width: 100%;
    padding: 10px 0px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: rgb(244, 220, 245);
}
.toolkit{
    padding: 5px;
    box-sizing: border-box;
}
.tool_entry {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin: 5px;
    line-height: 80px;
    background-color: azure;
}
.card_info {
    display: flex;
    height: 24px;
    line-height: 25px;
}
.info_key {
    padding: 0px 5px;
    width: 70px;
}
.developer_card {
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 20px;
    background-color: bisque;
}
</style>
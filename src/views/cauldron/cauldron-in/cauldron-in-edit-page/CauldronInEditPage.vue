<template>
    <div class="header">
        <Toolbar title="匿名投稿" @go-back="goBack" />
    </div>
    <div class="post_container">
        <div class="post_text">
            <textarea
                class="post_draft"
                v-model="text"
                name="post"
                rows="10"
                placeholder="你说，我听着呢。"
            ></textarea>
        </div>
        <div class="post_images"></div>
        <div class="post_cat_name_selector">
            <div class="selector_title">昵称显示</div>
            <div class="selector_state">暂未选择</div>
        </div>
        <div class="post_signature">
            <div class="selector_title">签名显示</div>
            <div class="selector_state">
                <span v-show="signature.length === 0">（默认）</span>
                <span>{{ useDefaultSignature(signature) }}</span>
            </div>
        </div>
        <div class="post_district_selector">
            <div class="selector_title">选择分区</div>
            <div class="selector_state">暂未选择</div>
        </div>
        <div class="post_tags">
            <div class="selector_title">添加tag</div>
            <div class="selector_state">暂未添加</div>
        </div>
        <div class="exit_confirm" v-show="showExitConfirm">
            <div class="title">保存草稿再退出？</div>
            <div class="option not_save" @click="exitWithoutSave">不保存</div>
            <div class="option save" @click="exitWithSave">保存</div>
            <div class="option cancel_exit" @click="exitCancel">取消退出</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue'
import useDefaultSignature from '../../hooks/useDefaultSignature'
import axios from 'axios';
import { useUserStore } from '@/store/user';
import { reactive, toRefs } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const data = reactive({
    text: '',
    catName: '',
    catNames: ["仙贝", "浩哥", "年糕", "模电", "数分", "竹林三花", "冰冰", "栋栋", "踏雪", "蛋黄酥"],
    district: '',
    districts: [],
    signature: '',
    tags: [],
    images: [],
    exitConfirmed: false,
    showExitConfirm: false
})
let { text, catName, catNames, districts, signature, tags, exitConfirmed, showExitConfirm } = toRefs(data)
onBeforeRouteLeave(() => {
    data.showExitConfirm = true
    if (data.exitConfirmed) {
        return true
    }
    else {
        return false
    }
})

function exitWithoutSave() {
    data.exitConfirmed = true
    goBack()
}
function exitWithSave() {
    axios.post(`${userStore.ip}:3000/post/draft`, {
        text: data.text,
        images: data.images,
        cat_name: data.catName,
        signature: data.signature,
        tags: data.tags
    }).then((response) => {
        data.exitConfirmed = true
        goBack()
    })
}
function exitCancel() {
    data.showExitConfirm = false
}
function goBack() {
    router.back()
}
</script>

<style scoped>
.post_container {
    padding: 0px 20px;
    position: relative;
    height: 100%;
}
.post_cat_name_selector,
.post_signature,
.post_district_selector,
.post_tags {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid silver;
    padding: 6px 0px;
}

.selector_title {
    font-size: 18px;
    text-align: left;
}
.selector_state {
    font-size: 18px;
    text-align: right;
    color: grey;
}

.post_text,
.post_draft {
    width: 100%;
    border: 0px;
    resize: none;
    outline: none;
    font-size: 16px;
}

.exit_confirm {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: whitesmoke;
}
.option.save {
    color: blueviolet;
}
.title{
    height: 40px;
    line-height: 40px;
}
.option{
    height: 30px;
}
</style>
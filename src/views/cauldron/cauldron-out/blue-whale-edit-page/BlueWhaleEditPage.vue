<template>
    <div class="header">
        <Toolbar title="实名投稿" @go-back="goBack" />
    </div>
    <div class="new_note_contents">
        <div class="new_note_img_sets">
            <div @click="uploadImage">
                <span>+</span>
            </div>
        </div>
        <input id="NotesUploadedImages" />
        <div class="new_note_title_div">
            <span class="new_note_title_text">标题</span>
            <div class="new_note_title_input_div">
                <input type="text" id="new_note_title" class="new_note_title_input" />
            </div>
        </div>
        <div class="new_note_tags_div">
            <span class="new_note_title_text">标签</span>
            <div class="new_note_tags_subdiv">
                <div id="new_note_title" @click="selectChannel" class="new_note_tags">美食</div>
                <div id="new_note_title" @click="selectChannel" class="new_note_tags">出游</div>
                <div id="new_note_title" @click="selectChannel" class="new_note_tags">摄影</div>
            </div>
        </div>
        <textarea placeholder="笔记内容（不少于30字）" class="new_note_textarea"></textarea>
        <p>
            <input class="new_note_rule" type="checkbox" />
            在发布此笔记前，我已经阅读、理解并同意
            <a
                href="#"
            >《蓝鲸笔记内容管理规范》</a>
        </p>
        <div class="new_note_button_container">
            <button @click="submitNote" class="new_note_button">发布笔记</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { reactive, toRefs } from 'vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import Toolbar from '@/components/Toolbar.vue';
import ImageLoader from './components/ImageLoader.vue';
import TextWriter from './components/TextWriter.vue';
import dayjs from 'dayjs';
const data = reactive({
    title: '',
    text: "",
    images: [],
    channel: "",
    type: "",
    tags: []
})
const userStore = useUserStore()
const router = useRouter()

function goBack(){
    router.back()
}

function submitNote() {
    if (data.title.length === 0) {
        console.log('请输入标题！')
    }
    else if (data.text.length === 0) {
        console.log('请输入笔记内容！')
    }
    else if (data.images.length === 0) {
        console.log('请添加合适的图片！')
    }
    else {
        axios.post(`${userStore.ip}:3000/edit/blue_whales`, {
            uid: userStore.uid,
            time: dayjs(),
            text: data.text,
            type: data.type,
            images: data.images,
            title: data.title,
            tags: data.tags
        })
    }
}

function uploadImage() {
    return
}

function selectChannel() {
    return
}
</script>

<style scoped>
.new_note_button_container {
    width: 100%;
    margin: 8px auto;
    text-align: center;
}

.new_note_button {
    margin: 6px;
    background-color: rgb(71, 132, 214);
    color: white;
    width: 40%;
    height: 40px;
    padding: 8px 0;
    font-size: 16px;
    border-radius: 20px;
    border: 0;
    vertical-align: middle;
    line-height: 24px;
}

.new_note_contents {
    padding: 12px;
    overflow-y: auto;
}

.new_note_img_sets {
    margin: 0 auto;
    margin-top: 26px;
    left: 50%;
    text-align: center;
}
.new_note_img_sets div {
    width: 28%;
    padding-top: 28%;
    text-align: center;
    position: relative;
    display: inline-block;
    border-radius: 5px;
    border: 3px dashed rgb(187, 187, 187);
    overflow: hidden;
    margin: 4px 5px;
}
.new_note_img_sets img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.new_note_img_sets span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 72px;
    border-radius: 4px;
    color: rgb(187, 187, 187);
    font-weight: bold;
    font-family: monospace;
}
.new_note_img_sets span.img_hint {
    font-size: 16px;
    color: var(--main-color-day-font);
}
.new_note_img_sets span.img_hint_en {
    font-size: 14px;
    color: var(--main-color-day-dark);
}

.new_note_title_div {
    padding: 0 22px;
    margin-top: 27px;
    height: 40px;
    line-height: 40px;
}

.new_note_title_text {
    font-size: 16px;
    color: rgb(71, 132, 214);
}

.new_note_title_input_div {
    float: right;
    border: 3px solid rgb(232, 245, 255);
    border-radius: 20px;
    width: calc(100% - 74px);
    height: 38px;
    line-height: 38px;
    vertical-align: middle;
}

.new_note_title_input {
    margin-left: 13px;
    height: 100%;
    padding: 0 6px;
    width: calc(100% - 26px);
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(16, 16, 16);
    font-size: 14px;
    opacity: 0.63;
    border: 0;
    outline: none;
}

.new_note_tags_div {
    padding: 0 22px;
    margin-top: 14px;
    height: 40px;
    line-height: 40px;
}

.new_note_tags_subdiv {
    float: right;
    width: calc(100% - 64px);
    text-align: left;
}

.new_note_tags {
    display: inline-block;
    width: 28%;
    height: 30px;
    line-height: 30px;
    color: rgb(16, 16, 16);
    font-size: 14px;
    text-align: center;
    background-color: rgb(245, 245, 245);
    opacity: 0.63;
    border-radius: 20px;
    margin: 0px 2%;
    transition: background-color, 300ms, color, 300ms;
}

.tag_selected {
    background-color: rgb(71, 132, 214);
    color: white;
    transition: background-color, 300ms, color, 300ms;
}

.new_note_textarea {
    padding: 12px;
    box-sizing: border-box;
    height: 260px;
    border-radius: 20px;
    resize: none;
    font-size: 16px;
    border: 3px solid rgb(232, 245, 255);
    outline: none;
}

.new_note_button {
    margin: 6px;
    background-color: rgb(71, 132, 214);
    color: white;
    width: 40%;
    height: 40px;
    padding: 8px 0;
    font-size: 16px;
    border-radius: 20px;
    border: 0;
    vertical-align: middle;
    line-height: 24px;
}
</style>
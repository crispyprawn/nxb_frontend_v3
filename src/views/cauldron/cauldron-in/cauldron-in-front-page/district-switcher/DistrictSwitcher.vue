<template>
    <div v-show="!editorExpanded" class="district_selector">
        <div class="district_names">
            <div class="district_name" :class="isChosen(0)" @click="chooseDistrict(0)">全部</div>
            <div
                class="district_name"
                :class="isChosen(district.id)"
                v-for="district in listedDistricts"
                :key="district.id"
                @click="chooseDistrict(district.id)"
            >{{ district.name }}</div>
        </div>
        <div class="editor_entry" @click="data.editorExpanded = true">更多</div>
    </div>
    <div v-show="editorExpanded" class="district_editor">
        <div class="districts_listed">
            <div class="title_bar">
                <div>
                    <span class="title">我的常逛分区</span>
                    <span class="title_hint" v-show="!editorActive">点击进入分区</span>
                    <span class="title_hint" v-show="editorActive">长按拖动排序</span>
                </div>
                <div class="editor_actions">
                    <div
                        v-show="!editorActive"
                        class="editor_edit"
                        @click="data.editorActive = true"
                    >编辑</div>
                    <div
                        v-show="editorActive"
                        class="editor_save"
                        @click="data.editorActive = false"
                    >完成</div>
                    <div class="editor_exit" @click="data.editorExpanded = false">收起</div>
                </div>
            </div>
            <div class="districts_list">
                <div class="district_name" :class="isChosen(0)" @click="chooseDistrict(0)">全部</div>
                <div
                    class="district_name"
                    :class="isChosen(district.id)"
                    v-for="district in listedDistricts"
                    :key="district.id"
                    @click="editorActive ? deleteDistrictFromList(district.id) : chooseDistrict(district.id)"
                >
                    <span>{{ district.name }}</span>
                    <i v-show="editorActive" class="iconfont">&#xe64e;</i>
                </div>
            </div>
        </div>
        <div class="districts_unlisted">
            <div class="title_bar">
                <div>
                    <span class="title">更多分区</span>
                    <span class="title_hint">点击添加分区</span>
                </div>
            </div>
            <div class="districts_list">
                <div
                    class="district_name"
                    v-for="district in unlistedDistricts"
                    :key="district.id"
                    @click="addDistrictToList(district.id)"
                >+{{ district.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive, toRefs, computed } from 'vue'
import { District } from '@/views/cauldron/cauldron'
const data = reactive({
    editorExpanded: false,
    editorActive: false,
    chosenDistrict: 0,
    allDistricts: [{
        id: 1,
        name: '爆料'
    }, {
        id: 2,
        name: '情感'
    }, {
        id: 3,
        name: '圆桌'
    }, {
        id: 4,
        name: '生活'
    }, {
        id: 5,
        name: '隔离'
    }, {
        id: 6,
        name: '学业'
    }, {
        id: 7,
        name: '交友'
    }, {
        id: 8,
        name: '灌水'
    }] as District[],
    districtChoices: [1, 2, 3, 4, 6, 7, 8] as number[]
})
let { editorExpanded, editorActive } = toRefs(data)
let listedDistricts = computed(() => {
    return data.districtChoices.map((id) => {
        return {
            id,
            name: (data.allDistricts.find((district) => district.id === id) as District).name
        } as District
    })
})
let unlistedDistricts = computed(() => {
    return data.allDistricts.filter(district => !data.districtChoices.includes(district.id))
})
function isChosen(id: number) {
    if (data.chosenDistrict === id) {
        return 'district_name_chosen'
    }
    else {
        return ''
    }
}
function getCustomedDistricts() {
    axios.post('http://192.168.10.11:3000/districts')
        .then((response) => {
            data.districtChoices = response.data
        })
}
function chooseDistrict(id: number) {
    data.chosenDistrict = id
}
function deleteDistrictFromList(id: number) {
    if (data.editorActive) {
        data.districtChoices.splice(data.districtChoices.indexOf(id), 1)
    }
}
function addDistrictToList(id: number) {
    data.districtChoices.push(id)
}
</script>

<style scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    font-size: 12px;
    color: #75a5ff;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.district_selector {
    display: flex;
    width: 100%;
}
.editor_entry {
    height: 30px;
    line-height: 30px;
    width: 50px;
    background-color: orange;
    flex: none;
}
.district_names {
    display: flex;
    flex-wrap: nowrap;
    flex: 1;
    width: 0;
    overflow: auto;
    scrollbar-width: none;
}
::-webkit-scrollbar {
    display: none;
}
.district_name {
    flex: none;
    width: 50px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
}
.district_name_chosen{
    color:white;
    background-color: black;
}
.districts_list {
    display: flex;
    flex-wrap: wrap;
}
.title_bar {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
}
.title_hint {
    color: gray;
    margin-left: 10px;
}
.title {
    font-size: 18px;
}
.editor_actions {
    display: flex;
}
.editor_edit,
.editor_save {
    border-radius: 15px;
    color: blue;
    margin-right: 20px;
}
</style>
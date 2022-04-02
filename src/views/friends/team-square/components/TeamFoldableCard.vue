<template>
    <div class="permanent_bar">
        <span class="team_attribute name" @click="showHideDetail">{{ team.name }}</span>
        <span
            class="team_attribute recruit_progress"
            @click="showHideDetail"
        >{{ team.members.length }} / {{ team.max_members }}</span>
        <i class="team_attribute join iconfont" @click="gotoTeamJoinPage">&#xe657;</i>
    </div>
    <div class="foldable_bar" :class="isDetailFolded ? 'fold' : 'unfold'">
        <div class="detail_padding">
            <div class="detail">
                <h4>队伍简介</h4>
                <div class="team_description">{{ team.description }}</div>
                <h4>队员名单</h4>
                <div class="members_list_header">
                    <span class="members_head">队员</span>
                    <span class="members_head">性别</span>
                    <span class="members_head">性取向</span>
                    <span class="members_head">入队时间</span>
                </div>
                <div class="members_list">
                    <div class="member" v-for="(member, index) in team.members" :key="index">
                        <span class="member_info">{{ member.nickname }}</span>
                        <span class="member_info">{{ useGenderCodeMapper(member.gender) }}</span>
                        <span
                            class="member_info"
                        >{{ useSexualOrientationCodeMapper(member.sexual_orientation) }}</span>
                        <span
                            class="member_info"
                        >{{ useTimeFormatter(member.join_time, "old_nxb") }}</span>
                    </div>
                    <div>
                        <span class="member">（注：点击队员可以查看其个人简介）</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Team } from '../../friends';
import useTimeFormatter from '@/hooks/useTimeFormatter'
import useGenderCodeMapper from '@/hooks/useGenderCodeMapper'
import useSexualOrientationCodeMapper from '@/views/friends/hooks/useSexualOrientationCodeMapper'
const props = defineProps<{
    team: Team
}>()
const router = useRouter()
const data = reactive({
    isDetailFolded: true
})
let { isDetailFolded } = toRefs(data)
function gotoTeamJoinPage() {
    router.push({
        name: 'joinTeam'
    })
}

function showHideDetail() {
    data.isDetailFolded = !data.isDetailFolded
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

.foldable_bar {
    transition: all 0.4s linear;
    background-color: white;
}
.foldable_bar.fold {
    max-height: 0px;
}
.foldable_bar.unfold {
    max-height: 400px;
}

.detail_padding {
    padding: 10px;
}
.detail {
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    overflow: hidden;
    padding: 10px;
    box-shadow: 0px 0px 1px 1px grey;
}

.permanent_bar {
    display: flex;
    align-items: center;
    height: 40px;
}
.team_attribute.name {
    flex: 2;
    color: blue;
}
.team_attribute {
    color: black;
    flex: 1;
}
.team_attribute.join {
    color: blue;
    flex: 1;
}

.member {
    border-bottom: 1px solid gray;
}
</style>
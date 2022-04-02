<template>
    <div class="container">
        <div class="team_initiate">
            <div class="team_init_entry" @click="gotoTeamInitPage">发起组队</div>
        </div>
        <br />
        <div class="team_list">
            <div class="team_list_item title">
                <div class="team_list_attribute name">队伍名称</div>
                <div class="team_list_attribute members">人数</div>
                <div class="team_list_attribute join">参与</div>
            </div>
            <div class="team_list_item single">
                <TeamFoldableCard v-for="team in teams" :key="team.tid" :team="team" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import TeamFoldableCard from './components/TeamFoldableCard.vue';
import { reactive, toRefs } from 'vue';
import { Team } from '@/views/friends/friends'
import { useUserStore } from '@/store/user';
import router from '@/router';
const userStore = useUserStore()
const data = reactive({
    teams: [] as Team[]
})

let { teams } = toRefs(data)

getTeamsOnSquare()

function getTeamsOnSquare() {
    axios.get(`${userStore.ip}:3000/team_square?uid=${userStore.uid}`)
        .then((response) => {
            data.teams = response.data.teams
        })
}
function gotoTeamInitPage() {
    router.push({
        name: 'initTeam'
    })
}

</script>

<style scoped>
.container {
    padding: 20px;
}
.team_initiate {
    width: 100%;
    height: 200px;
    padding-bottom: 20px;
    box-sizing: border-box;
    background-color: aliceblue;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.team_list {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: aliceblue;
    border-radius: 20px;
    box-shadow: 0px 0px 5px 1px grey;
}
.team_init_entry {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    border-radius: 20px;
    background-color: violet;
    color: aliceblue;
}
.team_list_item.title {
    display: flex;
    line-height: 40px;
    height: 40px;
}
.team_list_item:nth-of-type(odd) {
    background-color: aliceblue;
}
.team_list_item:nth-of-type(even) {
    background-color: white;
}
.team_list_attribute {
    font-weight: bold;
    color: black;
    text-align: center;
    flex: 1;
}
.team_list_attribute.name {
    flex: 2;
}
</style>
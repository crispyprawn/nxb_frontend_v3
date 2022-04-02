<template>
    <div class="detail_container">
        <div class="header">
            <Toolbar @go-back="goBack" :title="title"/>
        </div>
        <div class="detail"></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Toolbar from '@/components/Toolbar.vue';
const router = useRouter()
let title = 'good'
function goBack(){
    router.back()
}
</script>

<style scoped>
.detail_container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.header {
    flex: none;
}
.detail {
    flex: 1;
    height: 0px; /*高度设置成多少都行，反正会被flex-basis覆盖，但是不写的话内层的overflow无法生效 */
}
</style>
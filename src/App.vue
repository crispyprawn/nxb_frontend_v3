<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
    </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
let route = useRoute()
</script>

<style>
@font-face {
    font-family: "iconfont"; /* Project id 2949395 */
    src: url("//at.alicdn.com/t/font_2949395_2uyoh03dx2l.woff2?t=1648562151103")
            format("woff2"),
        url("//at.alicdn.com/t/font_2949395_2uyoh03dx2l.woff?t=1648562151103")
            format("woff"),
        url("//at.alicdn.com/t/font_2949395_2uyoh03dx2l.ttf?t=1648562151103")
            format("truetype");
}
* {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
html,
body {
    width: 100%;
    height: 100%;
}
</style>

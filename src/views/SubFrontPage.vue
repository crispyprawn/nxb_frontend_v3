<template>
    <div class="router">
        <router-view v-slot="{ Component, route }">
            <keep-alive>
                <component :is="Component" :key="route.name" v-if="route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!route.meta.keepAlive" />
        </router-view>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
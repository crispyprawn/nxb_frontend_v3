<template>
    <div class="container">
        <div class="avatar">{{ dialog.avatar_url }}</div>
        <div class="text">
            <div class="nickname">{{ dialog.latest_nickname }}</div>
            <div class="message">{{ dialog.latest_message }}</div>
        </div>
        <div class="info">
            <div class="time">{{ useTimeFormatter(dialog.latest_time, "old_nxb") }}</div>
            <div class="unread">{{ dialog.unreads }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Dialog } from '../../message';
import useTimeFormatter from '@/hooks/useTimeFormatter';
const props = defineProps<{
    dialog: Dialog
}>()
</script>

<style scoped>
.container {
    display: flex;
}
</style>
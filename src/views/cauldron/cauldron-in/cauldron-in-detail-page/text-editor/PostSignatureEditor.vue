<template>
    <div class="signature_container">
        <input
            type="text"
            class="text_input"
            @input="emits('update:signature', ($event.target as HTMLInputElement).value)"
        />
        <div class="send_button" @click="emits('finishEdit')">完成</div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    (event: 'finishEdit'): void,
    (event: 'update:signature', signature: string): void
}>()
</script>

<style scoped>
</style>
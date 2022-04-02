<template>
    <div class="editor_container">
        <div class="input_container">
            <input
                id="text_input"
                @input="emits('update:message', ($event.target as HTMLInputElement).value)"
                :value="message"
                :placeholder="replyPrefix.length === 0 ? '说点什么吧...' : replyPrefix"
                type="text"
            />
            <div class="send_button" @click="emits('submitComment')">发送</div>
        </div>
        <div class="foldable" v-show="richTextInvoked">
            <div class="choose_signature">
                <span class="user_signature">签名：{{ useDefaultSignature(signature) }}</span>
                <span class="change_signature" @click="emits('editSignature')">修改</span>
            </div>
            <div class="additional_function">
                <div class="emoji"></div>
                <div class="picture"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import useDefaultSignature from '@/views/cauldron/hooks/useDefaultSignature'
const props = defineProps<{
    message: string,
    signature: string,
    replyPrefix: string
    richTextInvoked: boolean,
    focused: boolean
}>()
const emits = defineEmits<{
    (event: "submitComment"): void
    (event: "editSignature"): void,
    (event: "update:message", value: string): void,
}>()
watch(
    () => props.focused,
    (newValue, oldValue) => {
        if (newValue) {
            document.getElementById('text_input')?.focus()
        }
        else{
            document.getElementById('text_input')?.blur()
        }
    })
</script>

<style scoped>
.editor_container {
    text-align: left;
    padding: 5px 0px;
}
.input_container,
.signature_container {
    width: 100%;
    display: flex;
}
#text_input {
    flex: 1;
    height: 32px;
    box-sizing: border-box;
    border-radius: 16px;
    outline: none;
    padding: 0px 8px;
    border: 0px transparent;
    background-color: aliceblue;
    font-size: 16px;
}
.send_button {
    flex: none;
    width: 50px;
    margin: 0px 0px 0px 5px;
    line-height: 32px;
    border-radius: 16px;
    background-color: rgb(113, 189, 255);
    text-align: center;
}
.user_signature {
    padding-left: 8px;
    font-size: 14px;
}
.change_signature {
    padding-left: 5px;
    font-size: 14px;
    color: rgb(113, 189, 255);
}
</style>
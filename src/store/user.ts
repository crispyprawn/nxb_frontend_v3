import { Dialog } from "@/views/message/message"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            uid: 16962,
            name: "",
            signature: "",
            gender: 1,
            hobbies: "",
            birthday: "",
            academy: "",
            hometown: "",
            ip: "http://192.168.10.11",
            score: 16,
            follows: 0,
            followers: 0,
            guests: 31,
            frontPagePreference: "in",
            dialogs:[] as Dialog[]
        }
    },
    getters: {},
    actions: {},
})

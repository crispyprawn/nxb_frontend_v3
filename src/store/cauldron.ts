import { PostParamsInDetail } from "@/views/cauldron/cauldron"
import { defineStore } from "pinia"

export const useCauldronStore = defineStore("cauldron", {
    state: () => {
        return {
            postViewStack: [] as PostParamsInDetail[],
            postSearchStack: [],
        }
    },
    getters: {
        peekPost(state) {
            return state.postViewStack[0]
        },
        peekPostTitle(state) {
            return "#" + state.postViewStack[0].id
        },
    },
    actions: {
    },
})

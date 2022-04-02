<template>
    <div class="header">
        <Toolbar @go-back="goBack()" title="search" />
    </div>
    <div class="cauldron_search_page_container">
        <SearchInput
            v-model:user-input="userInput"
            @send-search-request="searchQueryText(userInput)"
            @clear-search-text="clearResult"
        />
        <div v-show="!showResult" class="before_query">
            <SearchSuggestion @setSearchText="searchQueryText" />
            <SearchHistory @setSearchText="searchQueryText" />
        </div>
        <div v-show="showResult" class="after_query">
            <SearchResult :posts="searchResult" />
        </div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import SearchInput from './components/SearchInput.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import Toolbar from '@/components/Toolbar.vue'
import { PostParamsInBrief, SearchHotSpot } from '../../cauldron'
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const data = reactive({
    searchResult: [] as PostParamsInBrief[],
    showResult: false,
    networkError: false,
    userInput: ''
})
let { searchResult, showResult, networkError, userInput } = toRefs(data)

if ("keyword" in route.query) {
    data.userInput = route.query.keyword as string
    sendSearchRequest(route.query.keyword as string)
}


function sendSearchRequest(keyword: string) {
    axios.post(`${userStore.ip}:3000/search/cauldron&type=filter`, {
        keyword: keyword,
        uid: userStore.uid
    }).
        then((response) => {
            let cauldron = response.data
            data.searchResult = cauldron
            data.showResult = true
        })
}

function clearResult() {
    data.showResult = false
    data.userInput = ''
}

function searchQueryText(val: string) {
    router.replace({
        name: 'searchHotSpot',
        query: {
            keyword: val
        }
    })
    sendSearchRequest(val)
}

function goBack() {
    router.back()
}


</script>

<style scoped>
.cauldron_search_page_container {
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
}

::-webkit-scrollbar {
    width: 0px;
}
</style>

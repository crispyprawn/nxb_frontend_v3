<template><div class="myhome_my_info_div">
        <div class="myhome_avatar">
            <img src="{data:avatar}" style="width: 100%; height: 100%;">
        </div>
        <div class="myhome_my_info_subdiv">
            <div class="myhome_name">{data:name}</div>
            <div class="myhome_sign">{data:sign}</div>
        </div>
    </div>

    
    <div class="notes_main_contents" style="margin-top: 12px; min-height: 600px;">
        <div class="notes_content_nav_div">
            <span class="notes_content_nav_title notes_content_mode_selected"
                    onclick="favoritesSelectMode(this, 1);">我的发布</span>
            <span class="notes_content_nav_title"
                    onclick="favoritesSelectMode(this, 2);">我的收藏</span>
        </div>

        <!-- Content, 用 js 添加代码, 见 nxb_notes.js -->
        <div style="margin: 4px">
            <div class="waterfall_box waterfall_box_left" id="waterfall_box_left_home"></div>
            <div class="waterfall_box waterfall_box_right" id="waterfall_box_right_home"></div>
            <div style="clear: both;"></div>
        </div>
        
        <div class="weui-loadmore" id="loadingNotes">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">正在加载中...</span>
        </div>
        <div class="weui-loadmore" id="loadingFinished" style="display: none;">
            已经没有更多了
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
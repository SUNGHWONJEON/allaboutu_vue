<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <NoticeHome /><!-- 스타일 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import NoticeHome from '@/views/notice/NoticeHome.vue'

export default ({
    name: 'NoticeMain'
    ,components:{
        NoticeHome
    }
})
</script>
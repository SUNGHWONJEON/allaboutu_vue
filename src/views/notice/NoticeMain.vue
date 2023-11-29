<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <NoticeHome /><!-- 공지사항 컴포넌트 -->
            </div>
        </div>
    </div>

    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import NoticeHome from '@/views/notice/NoticeHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'NoticeMain'
    ,components:{
        PageHeader
        ,NoticeHome
        ,PageFooter
    }
})
</script>
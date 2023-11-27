<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <NoticeHome /><!-- 공지사항 컴포넌트 -->
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
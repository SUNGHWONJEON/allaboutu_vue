<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <CodyHome /><!-- 공지사항 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import CodyHome from '@/views/cody/CodyHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'CodyMain'
    ,components:{
        PageHeader
        ,CodyHome
        ,PageFooter
    }
})
</script>
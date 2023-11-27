<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <PageHome /><!-- 홈 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PageHome from '@/views/common/PageHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'PageMain'
    ,components:{
        PageHeader
        ,PageHome
        ,PageFooter
    }
})
</script>
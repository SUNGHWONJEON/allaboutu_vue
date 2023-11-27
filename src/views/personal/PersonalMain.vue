<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <PersonalHome /><!-- 퍼스널컬러 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PersonalHome from '@/views/personal/PersonalHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'PersonalMain'
    ,components:{
        PageHeader
        ,PersonalHome
        ,PageFooter
    }
})
</script>
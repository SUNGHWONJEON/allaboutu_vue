<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <StyleHome /><!-- 스타일 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import StyleHome from '@/views/style/StyleHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'StyleMain'
    ,components:{
        PageHeader
        ,StyleHome
        ,PageFooter
    }
})
</script>
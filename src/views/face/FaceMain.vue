<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <FaceHome /><!-- 페이스 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import FaceHome from '@/views/face/FaceHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'FaceMain'
    ,components:{
        PageHeader
        ,FaceHome
        ,PageFooter
    }
})
</script>
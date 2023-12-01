<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <RecommendHome /><!-- 페이스 컴포넌트 -->
            </div>
        </div>
    </div>
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import RecommendHome from '@/views/recommend/RecommendHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'RecommendMain'
    ,components:{
        PageHeader
        ,RecommendHome
        ,PageFooter
    }
})
</script>
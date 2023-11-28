<template>
    <div class="board-main-container">
        <PageHeader /><!-- 헤더 컴포넌트 -->
        <BoardHome /><!-- 게시판 컴포넌트 -->
        <PageFooter /><!-- 푸터 컴포넌트 -->
    </div>
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import BoardHome from '@/views/board/BoardHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'BoardMain'
    ,components:{
        PageHeader
        ,BoardHome
        ,PageFooter
    }
})
</script>

<style>
</style>
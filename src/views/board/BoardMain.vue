<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->

    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <BoardHome /> <!-- 게시판 컴포넌트 -->
            </div>
        </div>
    </div>

    <PageFooter /><!-- 푸터 컴포넌트 -->
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
    ,created() {
        this.$router.push({path: 'board'})
    },
})
</script>

<style>

</style>
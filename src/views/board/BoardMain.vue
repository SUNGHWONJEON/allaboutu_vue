<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <BoardHome /><!-- 게시판 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import BoardHome from '@/views/board/BoardHome.vue'

export default ({
    name: 'BoardMain'
    ,components:{
        BoardHome
    }
    ,created() {
        this.$router.push({path: 'board'})
    },
})
</script>

<style>

</style>
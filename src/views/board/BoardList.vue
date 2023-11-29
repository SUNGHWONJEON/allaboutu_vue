<template>
    <div class="board-list-section">
        <Board v-for="board in boards" :key="board.boardNum" :board="board" />
    </div>
</template>

<script>
import Board from '@/views/board/Board.vue'

export default {
    name: 'BoardList',
    components: {
        Board
    },
    data() {
        return {
            boards: [],
        }
    },
    // 로드하면서 실행하는 함수로 created와 mounted가 있음
    // created는 데이터 초기화의 목적, mounted는 DOM 조작에 대한 목적
    created() { // 로드될 때 실행할 함수
        this.$axios.get('/boards')
        .then((res) => {
            this.boards = res.data
            console.log(this.boards)
        }).catch((err) => {
            console.log(err)
        });
    },
}
</script>

<style>
.board-list-section {
    border: 1px solid orange;
    width: 640px;
    height: 100%;
    margin: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
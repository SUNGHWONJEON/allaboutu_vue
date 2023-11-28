<template>
    <div class="board-list-section">
        <Board />
        <Board />
        <Board />
        <Board />
    </div>
</template>

<script>
import Board from '@/views/board/Board.vue'

export default {
    name: 'BoardList',
    components: {
        Board
    }
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
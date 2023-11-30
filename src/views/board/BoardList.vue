<template>
    <div class="board-list-section">
        <Board v-for="board in boardList" :key="board.boardNum" :board="board" />
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
            boardList: [],
            totalPages: 0,
            currentPages: 1,
        }
    },
    methods: {
        loadPage(pageNumber) {
            this.$axios.get('/boards', {
                params: {
                    page: pageNumber
                }
            })
            .then(res => {
                this.boardList = res.data.content
                this.totalPages = res.data.totalPages
                this.currentPages = pageNumber
            }).catch(err => {
                console.error('Error fetching data:', err)
            });
        }
    },
    mounted() {
        this.loadPage(1)
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
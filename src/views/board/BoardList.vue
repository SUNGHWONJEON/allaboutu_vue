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
            currentPage: 0,
            scrollLock: false,
        }
    },
    methods: {
        loadPage() {
            if (this.currentPage > this.totalPages || this.scrollLock) {
                return;
            }

            this.scrollLock = true;
            this.$axios.get('/boards', {
                params: {
                    page: this.currentPage,
                    size: 4,
                }
            })
            .then(res => {
                this.boardList = [...this.boardList, ...res.data.content];
                this.totalPages = res.data.totalPages;
                this.currentPage++;
                this.scrollLock = false;
            }).catch(err => {
                console.error('Error fetching data:', err)
            });
        }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                this.loadPage();
            }
        });
        
        this.loadPage();
    },
}
</script>

<style>
.board-list-section {
    width: 640px;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
<template>
    <div class="board-list-section">
        <div class="search-keyword-area" v-if="boardList">
            "{{ keyword }}" 검색 결과
        </div>
        <div class="search-keyword-area" v-else>
            검색 결과가 없습니다.
        </div>
        <Board
            v-for="board in boardList"
            :key="board.boardNum"
            :board="board"
        />
    </div>
</template>

<script>
import Board from "@/views/board/Board.vue";

export default {
    name: "BoardSearch",
    components: {
        Board,
    },
    data() {
        return {
            keyword: "",
            boardList: [],
            totalPages: 0,
            currentPage: 0,
            scrollLock: false,
        }
    },
    mounted() {
        this.keyword = this.$route.params.keyword;
        
        window.addEventListener('scroll', () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                this.loadResult();
            }
        });

        this.loadResult();
    },
    methods: {
        loadResult() {
            if (this.currentPage > this.totalPages || this.scrollLock) {
                return;
            }
            
            this.scrollLock = true;
            this.$axios
                .get("/boards/search/" + this.keyword, {
                    params: {
                        keyword: this.keyword,
                        page: this.currentPage,
                        size: 4,
                    },
                })
                .then(res => {
                    this.boardList = [...this.boardList, ...res.data.content];
                    this.totalPages = res.data.totalPages;
                    this.currentPage++;
                    this.scrollLock = false;
                })
                .catch(err => {
                    console.error('Error fetching data:', err)
                });
        },
    
    },
    beforeRouteUpdate(to, from, next) {
        this.keyword = to.params.keyword;
        this.boardList = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.loadResult();
        next();
    },
};
</script>

<style scoped>
.board-list-section {
    border: 1px solid #ffcaca;
    width: 640px;
    height: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.search-keyword-area {
    text-align: left;
}
</style>
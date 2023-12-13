<template>
    <Searchbar />
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
import Searchbar from "./Searchbar.vue";

export default {
    name: "BoardSearch",
    components: {
        Board,
        Searchbar
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
        this.keyword = decodeURIComponent(this.$route.params.keyword);
        console.log('this.$route.params.keyword : ', this.keyword);
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
                .get('/boards/search', {
                    params: {
                        keyword: this.keyword,
                        page: this.currentPage,
                        size: 4,
                    },
                })
                .then(res => {
                    console.log('res : ', JSON.stringify(res));
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

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>
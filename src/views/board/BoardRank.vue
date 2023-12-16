<template>
    <div class="rank-container">
        <!--<div class="rank-title">인기 Best5</div>-->
        
        <table class="rank-table">
            <thead>
                <tr>
                    <th>순위</th>
                    <th>제목</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boards" :key="board.rank">
                    <td width="50">{{ board.rank }}</td>
                    <td width="200">
                        <router-link :to="'/board/' + board.boardNum">
                            {{ board.boardTitle }}
                        </router-link>
                    </td>
                    <td width="70">{{ formattedCreateDate(board.createDate) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/ko';

export default {
    name: 'BoardRank',
    components: {
    },
    data() {
        return {
            boards: [],
        }
    },
    mounted() {
        this.getBoardRank();
    },
    methods: {
        formattedCreateDate(createDate) {
            return moment(createDate).fromNow();
        },
        getBoardRank() {
            this.$axios.get('/boards/rank')
                .then((response) => {
                    this.boards = response.data.content;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>
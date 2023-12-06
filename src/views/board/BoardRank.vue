<template>
    <div class="rank-container">
        <div class="rank-title">주간 인기 Best5</div>
        
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
                    <td width="300">{{ board.title }}</td>
                    <td width="100">{{ formattedCreateDate(board.createDate) }}</td>
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
            boards: [
                {
                    rank: 1,
                    title: '제목1',
                    writer: '작성자1'
                },
                {
                    rank: 2,
                    title: '제목2',
                    writer: '작성자2'
                },
                {
                    rank: 3,
                    title: '제목3',
                    writer: '작성자3'
                },
                {
                    rank: 4,
                    title: '제목4',
                    writer: '작성자4'
                },
                {
                    rank: 5,
                    title: '제목5',
                    writer: '작성자5'
                }
            ]
        }
    },
    methods: {
        formattedCreateDate(createDate) {
            return moment(createDate).fromNow();
        }
    },
}
</script>

<style>
.rank-container {
    position: fixed;
    top: 150px;
    left: calc(50% + 250px);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.rank-table {
    border: 1px solid gray;
}

.rank-items {
    border: 1px solid green;
    width: 150px;
    height: 50px;
}
</style>
<template>
    <div class="board-list-section">
        <Board v-if="board" :board="board" />
    </div>
</template>

<script>
import Board from './Board.vue';

export default {
    name: 'BoardDetail',
    components: {
        Board,
    },
    data() {
        return {
            board: '',
        }
    },
    methods: {
        loadPage() {
            console.log('params : ' + this.$route.params.boardNum);
            this.$axios.get('/boards/' + this.$route.params.boardNum)
            .then(res => {
                this.board = res.data;
            }).catch(err => {
                console.error('Error fetching data:', err)
            });
        }
    },
    created() {
        if(this.$route.params.boardNum != null) {
            this.loadPage();
        }
    },
}
</script>

<style scoped>
    
</style>
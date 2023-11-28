<template>
    <div class="rank-container">
        <div class="rank-title">주간 인기 Best5</div>
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
        <RankItem />
    </div>
</template>

<script>
import RankItem from './RankItem.vue';

export default {
    name: 'BoardRank',
    components: {
        RankItem,
    },
}
</script>

<style>
.rank-container {
    position: absolute;
    top: 150px;
    left: 800px;
    width: 200px;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
}
</style>
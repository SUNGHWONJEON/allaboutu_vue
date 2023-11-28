<template>
    <div class="community-container">
        <NoticeBanner />
        <BoardList />
    </div>
</template>

<script>
import NoticeBanner from './NoticeBanner.vue'
import BoardList from './BoardList.vue'
import BoardRank from './BoardRank.vue';

export default {
    name: 'PageCommunity',
    components: {
        NoticeBanner,
        BoardList,
        BoardRank
    }
}
</script>

<style>
.community-container {
    border: 1px solid red;
    width: 640px;
    height: 85vh;
    margin-top: 80px;
}
</style>
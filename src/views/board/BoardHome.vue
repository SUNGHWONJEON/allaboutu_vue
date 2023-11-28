<template>
    <Community />
    <BoardRank />
    <BoardWriteBtn />
    <Chatbot />
</template>

<script>
import Community from './Community.vue';
import BoardRank from './BoardRank.vue';
import BoardWriteBtn from './BoardWriteBtn.vue';
import Chatbot from './Chatbot.vue';

export default {
    name: 'PageCommunity',
    components: {
        Community,
        BoardRank,
        BoardWriteBtn,
        Chatbot
    }
}
</script>

<style>

</style>
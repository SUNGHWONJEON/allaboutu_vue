<template>
    <div class="community-container">
        <NoticeBanner />
        <BoardList />
    </div>
    
    <div class="fixed-elements">
        <!-- 주간 인기글 Best5 -->
        <BoardRank />
        
        <!-- 글쓰기 버튼 -->
        <router-link to="/boards/write">
            <img class="board-write-btn" src="@/assets/images/community/board_write_btn.png">
        </router-link>
        
        <!-- 챗봇 버튼 -->
        <router-link to="/boards/write">
            <img class="chatbot-btn" src="@/assets/images/community/chatbot_icon.png">
        </router-link>
    </div>
</template>

<script>
import NoticeBanner from './NoticeBanner.vue';
import BoardList from './BoardList.vue';
import BoardRank from './BoardRank.vue';

export default {
    name: 'BoardHome',
    components: {
        NoticeBanner,
        BoardList,
        BoardRank,
    }
}
</script>

<style>
.community-container {
    border: 1px solid red;
    width: 640px;
}

.board-write-btn {
    position: fixed;
    top: 90vh;
    left: calc(50% + 250px);
    width: 50px;
    height: 50px;
}

.chatbot-btn {
    position: fixed;
    top: 90vh;
    left: calc(50% + 330px);
    width: 50px;
    height: 50px;
}
</style>
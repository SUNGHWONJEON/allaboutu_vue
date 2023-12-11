<template>
    <Searchbar />
    
    <div class="community-container">
        <NoticeBanner />
        <BoardList />
    </div>

    <div class="fixed-elements">
        <!-- 주간 인기글 Best5 -->
        <!-- <BoardRank /> -->

        <!-- 검색바 -->
        <!-- <Searchbar /> -->

        <!-- 모달 팝업 -->

        <!-- 글쓰기 버튼 -->
        <router-link to="/board/write">
            <img
                class="board-write-btn"
                src="@/assets/images/community/board_write_btn.png"
            />
        </router-link>

        <!-- 챗봇 버튼 -->
        <router-link to="/board/write">
            <img
                class="chatbot-btn"
                src="@/assets/images/community/chatbot_icon.png"
            />
        </router-link>
    </div>
</template>

<script>
import NoticeBanner from "./NoticeBanner.vue";
import BoardList from "./BoardList.vue";
import BoardRank from "./BoardRank.vue";
import Searchbar from "./Searchbar.vue";
import ReportPopup from "./ReportPopup.vue";

export default {
    name: "BoardHome",
    components: {
        NoticeBanner,
        BoardList,
        BoardRank,
        Searchbar,
        ReportPopup,
    },
};
</script>

<style>
.community-container {
    border: 1px solid #e2e2e2;
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
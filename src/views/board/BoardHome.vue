<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            COMMUNITY
        </div>
        <div class="pic-titile-sub">
            리뷰를 확인하세요.
        </div>
    </div>

    <Searchbar />
    
    <div class="community-container">
        <NoticeBanner />
        <BoardList />
    </div>

    <div class="fixed-elements">

        <!-- 글쓰기 버튼 -->
        <img
            class="board-write-btn"
            src="@/assets/images/community/board_write_btn.png"
            @click="moveToWritePage"
        />

        <!-- 챗봇 버튼 -->
        <router-link to="/chatbot">
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
    methods: {
        moveToWritePage() {
            if (!this.isLogin()) return;

            this.$router.push("/board/write");
        },
        isLogin() {
            const loginUserId = sessionStorage.getItem("userId");

            if (loginUserId == "" || loginUserId == null) {
                if (confirm("로그인 후 이용해주세요.")) {
                    this.$router.push("/login");
                }
                return false;
            }

            return true;
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>
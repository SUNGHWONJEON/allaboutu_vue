<template>
    <div class="board-container">
        <div class="board-profile-section border-bottom-2-s-gray">
            <ProfileHeader :writer="board.writer" />
            <div class="board-context-menu">
                <button @click="editBoard(board.boardNum)" v-if="hasPermission">
                    수정
                </button>
                <button
                    @click="deleteBoard(board.boardNum)"
                    v-if="hasPermission"
                >
                    삭제
                </button>
                <button @click="reportBoard(board.boardNum)" v-if="this.loginUserId">신고</button>
            </div>
            <ReportPopup
                v-if="showReportPopup"
                @close="showReportPopup = false"
                :reportBoardNum="board.boardNum"
                :reportUserNum="loginUserNum"
            >
                <h3>
                    게시글 신고
                    <button @click="showReportPopup = false">닫기</button>
                </h3>
            </ReportPopup>
        </div>
        <div class="board-title-section border-bottom-2-s-gray">
            <div class="board-category div-flex-middle">
                <span>{{ board.category }}</span>
            </div>
            <div class="board-title div-flex-middle">
                {{ board.boardTitle }}
            </div>
            <div class="board-date div-flex-middle">
                {{ formattedCreateDate }}
            </div>
        </div>
        <div class="board-content border-bottom-2-s-gray">
            <span>{{ board.boardContent }}</span>
            <div class="board-content-images">
                <img
                    v-for="image in board.attachments"
                    :key="image.id.attachNum"
                    :src="'/boards/image/' + image.renameFileName"
                    :alt="image.originalFileName"
                />
            </div>
        </div>
        <div
            class="board-hashtag-list border-bottom-2-s-gray"
            v-if="hashtags.length > 0"
        >
            <span
                v-for="hashtag in hashtags"
                :key="hashtag"
                @click="searchHashtag(hashtag.hashtag)"
            >
                #{{ hashtag.hashtag }}
            </span>
        </div>
        <!-- (댓글수, 좋아요수, 조회수) -->
        <div class="info-section border-bottom-2-s-gray">
            <div class="like-count">
                <img
                    v-if="isLiked"
                    class="like-icon"
                    src="@/assets/images/community/like_full.jpeg"
                    @click="like"
                />
                <img
                    v-else
                    class="like-icon"
                    src="@/assets/images/community/like_empty.jpeg"
                    @click="like"
                />
                {{ board.likeCount }}
            </div>
            <div class="comment-count">
                <img
                    class="comment-icon"
                    src="@/assets/images/community/comment_icon.png"
                />
                {{ board.commentCount }}
            </div>
            <div class="read-count">조회수 {{ board.readCount }}</div>
        </div>

        <!-- 댓글 등록 영역 -->
        <div class="comment-write">
            <input
                type="text"
                class="comment-input"
                v-model="newCommentText"
                placeholder="댓글을 입력하세요."
                @keyup.enter="postComment"
            />
            <button class="comment-submit-btn" @click="postComment">
                등록
            </button>
        </div>

        <!-- 댓글 목록 -->
        <div class="comment-list-section">
            <Comment
                :comments="this.comments"
                @reply-posted="loadComments"
                @comment-deleted="loadComments"
            />
        </div>
    </div>
</template>

<script>
import ProfileHeader from "./ProfileHeader.vue";
import CommentList from "./CommentList.vue";
import Comment from "./Comment.vue";
import moment from "moment";
import "moment/locale/ko";
import ReportPopup from "./ReportPopup.vue";
import base64 from "base-64";

export default {
    name: "Board",
    components: {
        ProfileHeader,
        CommentList,
        Comment,
        ReportPopup,
    },
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            comments: this.board.comments, // 댓글 목록
            hashtags: this.board.hashtags, // 해시태그 목록
            isLiked: false, // 로그인한 유저의 좋아요 여부
            showReportPopup: false, // 신고 팝업 노출 여부
            reportBoardNum: "", // 신고 당한 게시글 번호
            reportUserNum: "", // 신고한 유저 ID
            newCommentText: "", // 댓글 내용
            hasPermission: false, // 게시글 수정, 삭제 권한
            loginUserId: "", // 로그인한 유저 아이디
            loginUserNum: "", // 로그인한 유저 번호
        };
    },
    created() {
        // 액세스 토큰에서 정보 추출
        let token = sessionStorage.getItem("accessToken");
        if (token != null) {
            let payload = token.split(".")[1];
            let dec = base64.decode(payload);
            dec = JSON.parse(dec);
            
            this.loginUserId = dec.sub;
            this.loginUserNum = dec.userNum;
            this.hasPermission = this.checkPermission();

            // 좋아요 여부 확인
            this.$axios
                .get(
                    `/boards/${this.board.boardNum}/likes/${this.loginUserNum}`
                )
                .then((res) => {
                    this.isLiked = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    computed: {
        formattedCreateDate() {
            return moment(this.board.createDate).fromNow();
        },
    },
    methods: {
        postComment() {
            if (this.loginUserId == "") {
                alert("로그인 후 이용해주세요.");
                this.$router.push("/login");
                return;
            }
            
            // newCommentText를 DB에 등록하는 로직
            const newComment = {
                boardNum: this.board.boardNum,
                userNum: this.loginUserNum,
                parentNum: null,
                content: this.newCommentText,
            };

            // 댓글 등록
            this.$axios
                .post(
                    "/boards/" + newComment.boardNum + "/comments",
                    newComment
                )
                .then((res) => {
                    alert("댓글이 등록되었습니다.");
                    this.newCommentText = "";

                    // 댓글 목록 업데이트
                    this.loadComments();
                })
                .catch((err) => {
                    alert("댓글 등록에 실패하였습니다.");
                    console.log(err);
                });
        },
        loadComments() {
            // 댓글 목록 업데이트
            this.$axios
                .get("/boards/" + this.board.boardNum + "/comments")
                .then((res) => {
                    this.comments = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        like() {
            const url = `/boards/${this.board.boardNum}/likes/${this.loginUserNum}`;

            if (this.loginUserId == "") {
                alert("로그인 후 이용해주세요.");
                this.$router.push("/login");
                return;
            }

            if (this.isLiked) {
                // 좋아요 취소
                this.$axios
                    .delete(url)
                    .then((res) => {
                        this.isLiked = false;
                        this.board.likeCount--;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                // 좋아요 등록
                this.$axios
                    .post(url)
                    .then((res) => {
                        this.isLiked = true;
                        this.board.likeCount++;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        editBoard(boardNum) {
            // 수정할 게시글 정보를 BoardWrite.vue에 전달
            this.$router.push("/board/write/" + boardNum);
        },
        deleteBoard(boardNum) {
            if (confirm("게시글을 삭제하시겠습니까?")) {
                // 게시글 삭제
                this.$axios
                    .delete("/boards/" + boardNum)
                    .then((res) => {
                        alert("게시글이 삭제되었습니다.");
                        // this.$router.push('/board');
                        this.$router.go(0);
                    })
                    .catch((err) => {
                        alert("게시글 삭제에 실패하였습니다.");
                        console.log(err);
                    });
            }
        },
        reportBoard(boardNum) {
            this.showReportPopup = true;
            this.reportBoardNum = boardNum;
            this.reportUserNum = this.loginUserNum;
        },
        submitReport() {
            const reportData = {
                boardNum: this.reportBoardNum,
                reportUserNum: this.reportUserNum,
                reportCause: this.reportCause,
                reportReason: this.reportReason,
            };

            // 게시글 신고
            this.$axios
                .post("/boards/" + this.reportBoardNum + "/reports", reportData)
                .then((res) => {
                    alert("게시글이 신고되었습니다.");
                    this.showReportPopup = false;
                    this.reportBoardNum = "";
                    this.reportCause = "";
                    this.reportReason = "";
                    this.reportUserNum = "";
                })
                .catch((err) => {
                    alert("게시글 신고에 실패하였습니다.");
                    console.log(err);
                });
        },
        searchHashtag(hashtag) {
            this.$router.push({
                name: "BoardSearch",
                params: {
                    keyword: hashtag,
                },
            });
        },
        checkPermission() {
            // 로그인한 유저가 게시글 작성자인지 확인
            return this.loginUserId === this.board.writer.userId;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/board.scss";
</style>
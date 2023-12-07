<template>
    <div class="board-container">
        <div class="board-profile-section border-bottom-2-s-gray">
            <ProfileHeader :writer="board.writer" />
            <div class="board-context-menu">
                <button @click="editBoard(board.boardNum)">수정</button>
                <button @click="deleteBoard(board.boardNum)">삭제</button>
                <button @click="reportBoard(board.boardNum)">신고</button>
            </div>
            <div class="report-popup" v-if="showReportPopup">
                <h2>게시글 신고</h2>
                <select v-model="reportCause">
                    <option value="" disabled selected>신고 사유</option>
                    <option value="욕설">욕설</option>
                    <option value="광고">광고</option>
                    <option value="음란성">음란성</option>
                    <option value="기타">기타</option>
                </select>
                <textarea v-model="reportReason" placeholder="신고 내용을 작성해주세요."></textarea>
                <button @click="submitReport">제출</button>
                <button @click="showReportPopup = false">취소</button>
            </div>
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
                <img v-for="image in board.attachments"
                    :key="image.id.attachNum"
                    :src="'/boards/image/' + image.renameFileName"
                    :alt="image.originalFileName" />
            </div>
        </div>
        <div class="board-hashtag-list border-bottom-2-s-gray" v-if="hashtags.length > 0">
            <span v-for="hashtag in hashtags" :key="hashtag">
                #{{ hashtag.hashtag }} 
            </span>
        </div>
        <!-- (댓글수, 좋아요수, 조회수) -->
        <div class="info-section border-bottom-2-s-gray">
            <div class="like-count">
                <img v-if="isLiked" class="like-icon" src="@/assets/images/community/like_full.jpeg" @click="like">
                <img v-else class="like-icon" src="@/assets/images/community/like_empty.jpeg" @click="like">
                {{ board.likeCount }}
            </div>
            <div class="comment-count">
                <img class="comment-icon" src="@/assets/images/community/comment_icon.png">
                {{ board.commentCount }}
            </div>
            <div class="read-count">
                조회수 {{ board.readCount }}
            </div>
        </div>
        
        <!-- 댓글 등록 영역 -->
        <div class="comment-write">
            <input type="text" class="comment-input" v-model="newCommentText" placeholder="댓글을 입력하세요." @keyup.enter="postComment" />
            <button class="comment-submit-btn" @click="postComment">등록</button>
        </div>
        
        <!-- 댓글 목록 -->
        <div class="comment-list-section">
            <Comment :comments="this.comments"
                @reply-posted="loadComments"
                @comment-deleted="loadComments" />
        </div>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';
import CommentList from './CommentList.vue';
import Comment from './Comment.vue';
import moment from 'moment';
import 'moment/locale/ko';

export default {
    name: 'Board',
    components: {
        ProfileHeader,
        CommentList,
        Comment
    },
    props: {
        board: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            comments: this.board.comments,
            hashtags: this.board.hashtags,
            isLiked: false,
            tempUserNum: 2, // 임시로 로그인한 유저 번호
            showReportPopup: false,
            reportBoardNum: '', // 신고 당한 게시글 번호
            reportCause: '', // 신고 사유
            reportReason: '', // 신고 내용
            reportUserNum: '', // 신고한 유저 번호
            newCommentText: '', // 댓글 내용
        }
    },
    created() {
        // 좋아요 여부 확인
        this.$axios.get('/boards/' + this.board.boardNum + '/likes/' + this.tempUserNum)
            .then(res => {
                this.isLiked = res.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    computed: {
        formattedCreateDate() {
            return moment(this.board.createDate).fromNow();
        }
    },
    methods: {
        postComment() {
            // newCommentText를 DB에 등록하는 로직
            const newComment = {
                boardNum: this.board.boardNum,
                userNum: this.tempUserNum,
                parentNum: null,
                content: this.newCommentText
            };

            // 댓글 등록
            this.$axios.post('/boards/' + newComment.boardNum + '/comments', newComment)
                .then(res => {
                    alert('댓글이 등록되었습니다.')
                    this.newCommentText = '';
                    
                    // 댓글 목록 업데이트
                    this.loadComments();
                })
                .catch(err => {
                    alert('댓글 등록에 실패하였습니다.')
                    console.log(err);
                });
        },
        loadComments() {
            // 댓글 목록 업데이트
            this.$axios.get('/boards/' + this.board.boardNum + '/comments')
                .then(res => {
                    this.comments = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        like() {
            const url = '/boards/' + this.board.boardNum + '/likes/' + this.tempUserNum;

            if(this.isLiked) {
                // 좋아요 취소
                this.$axios.delete(url)
                    .then(res => {
                        this.isLiked = false;
                        this.board.likeCount--;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                // 좋아요 등록
                this.$axios.post(url)
                    .then(res => {
                        this.isLiked = true;
                        this.board.likeCount++;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        editBoard(boardNum) {
            // 수정할 게시글 정보를 BoardWrite.vue에 전달
            this.$router.push('/boards/write/' + boardNum);
        },
        deleteBoard(boardNum) {
            // 게시글 삭제
            this.$axios.delete('/boards/' + boardNum)
                .then(res => {
                    alert('게시글이 삭제되었습니다.');
                    // this.$router.push('/board');
                    this.$router.go(0);
                })
                .catch(err => {
                    alert('게시글 삭제에 실패하였습니다.');
                    console.log(err);
                });
        },
        reportBoard(boardNum) {
            this.showReportPopup = true;
            this.reportBoardNum = boardNum;
            this.reportUserNum = this.tempUserNum;
        },
        submitReport() {
            const reportData = {
                boardNum: this.reportBoardNum,
                reportUserNum: this.reportUserNum,
                reportCause: this.reportCause,
                reportReason: this.reportReason,
            };
            
            // 게시글 신고
            this.$axios.post('/boards/' + this.reportBoardNum + '/reports', reportData)
                .then(res => {
                    alert('게시글이 신고되었습니다.');
                    this.showReportPopup = false;
                    this.reportBoardNum = '';
                    this.reportCause = '';
                    this.reportReason = '';
                    this.reportUserNum = '';
                })
                .catch(err => {
                    alert('게시글 신고에 실패하였습니다.');
                    console.log(err);
                });
        },
    },
}
</script>

<style scoped>
* {
    line-height: 1.2;
    text-align: left;
}

.board-container {
    border: 2px solid gray;
    border-radius: 20px;
    width: 600px;
    margin: 10px;
}

.board-title-section {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 50px;
}

.div-flex-middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.board-category {
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.board-category span {
    border: 1px solid gray;
    width: 40px;
    height: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.board-title {
    width: 75%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.board-date {
    width: 15%;
    text-align: center;
}

.board-content {
    min-height: 100px;
    padding: 10px;
}
.board-content span {
    margin: 10px;
}
.board-content-images img {
    max-width: 300px;
    max-height: 250px;
    margin: 10px;
    border-radius: 10px;
}

.info-section {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.like-count {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.like-icon {
    width: 40px;
    height: 30px;
    margin-left: 10px;
    margin-left: 10px;
}

.comment-count {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.comment-icon {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    margin-right: 10px;
}

.read-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
}

.board-hashtag-list {
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.board-hashtag-list span {
    color: blue;
    cursor: pointer;
    margin: 10px;
}


.comment-write {
    width: 600px;
    height: 60px;
}
.comment-input {
    border: 2px solid gray;
    border-radius: 10px;
    width: 520px;
    height: 40px;
    margin: 10px;
    padding: 10px;
}
.comment-submit-btn {
    border: 2px solid gray;
    border-radius: 10px;
    width: 50px;
    height: 40px;
    margin: 10px;
    margin-left: 0;
    text-align: center;
}

.board-profile-section {
    display: flex;
    padding: 5px;
}

.border-bottom-2-s-gray {
    border-bottom: 2px solid gray;
}

.board-context-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
}
.board-context-menu button {
    border: 1px solid gray;
    width: 50px;
    height: 30px;
    text-align: center;
}
.comment-list-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
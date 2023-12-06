<template>
    <div class="board-container">
        <div class="board-profile-section">
            <ProfileHeader :userId="board.userId" :userName="board.userName" />
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
        <div class="board-title-section">
            <div class="board-category">
                {{ board.category }}
            </div>
            <div class="board-title">
                {{ board.boardTitle }}
            </div>
            <div class="board-date">
                {{ formattedCreateDate }}
            </div>
        </div>
        <div class="board-content">
            <span>{{ board.boardContent }}</span>
            <div class="board-content-images">
                <img v-for="image in board.attachments"
                    :key="image.id.attachNum"
                    :src="'/boards/image/' + image.renameFileName"
                    :alt="image.originalFileName" />
            </div>
        </div>
        <div class="board-hashtag-list" v-if="hashtags.length > 0">
            <span v-for="hashtag in hashtags" :key="hashtag">
                #{{ hashtag.hashtag }} 
            </span>
        </div>
        <!-- (댓글수, 좋아요수, 조회수) -->
        <div class="info-section">
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
            <input type="button" class="comment-submit-btn" value="등록" @click="postComment" />
        </div>
        
        <!-- 댓글 목록 -->
        <Comment :comments="this.comments"
            @reply-posted="loadComments"
            @comment-deleted="loadComments" />
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
    border: 1px solid blud;
    width: 600px;
    margin: 10px;
}

.board-title-section {
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 30px;
}

.board-category {
    border: 1px solid violet;
    width: 10%;
}

.board-title {
    border: 1px solid violet;
    width: 75%;
    text-align: left;
}

.board-date {
    border: 1px solid violet;
    width: 15%;
}

.board-content {
    border: 1px solid blue;
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
    border: 1px solid blue;
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
    border: 1px solid blue;
    height: 30px;
    display: flex;
    flex-direction: row;
}

.comment-write {
    border: 1px solid blue;
    width: 600px;
    height: 60px;
}
.comment-input {
    border: 1px solid blue;
    border-radius: 10px;
    width: 490px;
    height: 30px;
    margin: 10px;
    padding: 5px;
}
.comment-submit-btn {
    border: 1px solid blue;
    border-radius: 10px;
    width: 50px;
    height: 40px;
    margin: 10px;
    margin-left: 0;
    padding: 5px;
}

.board-profile-section {
    display: flex;
}

.board-context-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.board-context-menu button {
    border: 1px solid gray;
    width: 50px;
    height: 30px;
    text-align: center;
}
</style>
<template>
    <div class="comment-container" v-for="comment in comments" :key="comment.commentNum">
        <div class="comment-profile-section">
            <ProfileHeader :userId="comment.userId" :userName="comment.userName" />
            
            <!-- 댓글 작성일시 -->
            <div class="comment-date">
                1시간 전
            </div>
            <div class="comment-context-menu">
                <div @click="editComment(comment)">수정</div>
                <div @click="deleteComment(comment.commentNum)">삭제</div>
                <div @click="reportComment(comment.commentNum)">신고</div>
            </div>
        </div>
        <div class="comment-content" v-if="isEditing !== comment.commentNum">
            {{ comment.content }}
        </div>
        <div v-else class="comment-edit-area">
            <textarea v-model="comment.content" class="comment-edit-textarea"></textarea>
            <div class="comment-edit-btns">
                <button class="comment-edit-btn" @click="saveComment(comment)">수정</button>
                <button class="comment-edit-btn" @click="cancelEdit(comment)">취소</button>
            </div>
        </div>
        
        <div class="reply-section">
            <div class="reply-btns">
                <button class="write-toggle-btn" @click="toggleReplyForm(comment.commentNum)">
                    <span v-if="showReplyForm === comment.commentNum">답글 취소</span>
                    <span v-else>답글 쓰기</span>
                </button>
                <button v-show="showReplyForm === comment.commentNum" class="submit-reply-btn" @click="postReply(comment.commentNum)">답글 등록</button>
            </div>
            <div class="reply-form" v-show="showReplyForm === comment.commentNum">
                <textarea class="reply-textarea" v-model="replyText"></textarea>
            </div>
            
        </div>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';

export default {
    name: 'BoardComment',
    components: {
        ProfileHeader,
    },
    props: {
        comments: 'comments',
    },
    data() {
        return {
            showReplyForm: null, // 댓글에 대한 답글 폼을 
            replyText: '', // 답글 텍스트
            isEditing: null, // 수정 중인 댓글 번호
            originalCommentContent: '', // 수정 전 댓글 내용
            tempUserNum: 2, // 임시로 로그인한 유저 번호
        }
    },
    methods: {
        toggleReplyForm(commentNum) {
            // 버튼 클릭 시 답글 폼 토글
            this.showReplyForm = this.showReplyForm === commentNum ? null : commentNum;
            this.replyText = ''; // 토글할 때마다 텍스트 초기화
        },
        postReply(commentNum) {
            // replyText를 DB에 등록하는 로직
            const newReply = {
                boardNum: this.comments[0].boardNum,
                userNum: this.tempUserNum,
                parentNum: commentNum,
                content: this.replyText
            };

            // 답글 등록
            this.$axios.post('/boards/' + newReply.boardNum + '/comments', newReply)
                .then(res => {
                    alert('답글이 등록되었습니다.')
                })
                .catch(err => {
                    alert('답글 등록에 실패하였습니다.')
                    console.log(err);
                });

            // 답글 작성 폼 닫기
            this.showReplyForm = null;
            this.replyText = '';
        },
        editComment(comment) {
            // 수정 중인 댓글이 있을 경우 수정 취소
            if(this.isEditing !== null) {
                this.cancelEdit(this.isEditing);
            }
            
            // 수정 중인 댓글 정보 저장
            this.isEditing = comment.commentNum;
            this.originalCommentContent = comment.content;
        },
        saveComment(comment) {
            // 수정한 댓글 내용을 DB에 등록하는 로직
            this.$axios.patch('/boards/' + comment.boardNum + '/comments/' + comment.commentNum, comment)
                .then(res => {
                    alert('댓글이 수정되었습니다.')
                })
                .catch(err => {
                    alert('댓글 수정에 실패하였습니다.')
                    console.log(err);
                });
            
            // 수정 중인 댓글 번호 초기화
            this.isEditing = null;
            this.originalCommentContent = '';
        },
        cancelEdit(comment) {
            // 댓글 수정 취소
            comment.content = this.originalCommentContent;
            this.isEditing = null;
            this.originalCommentContent = '';
        },
        deleteComment(commentNum) {
            // 댓글 삭제
            this.$axios.delete('/boards/' + this.comments[0].boardNum + '/comments/' + commentNum)
                .then(res => {
                    alert('댓글이 삭제되었습니다.')
                })
                .catch(err => {
                    alert('댓글 삭제에 실패하였습니다.')
                    console.log(err);
                });
        },
        reportComment(commentNum) {
            // 댓글 신고
            this.$axios.post('/boards/' + this.comments[0].boardNum + '/comments/' + commentNum + '/reports')
                .then(res => {
                    alert('댓글이 신고되었습니다.')
                })
                .catch(err => {
                    alert('댓글 신고에 실패하였습니다.')
                    console.log(err);
                });
        
        }
    }
}
</script>

<style>
.comment-profile-section {
    width: 600px;
    display: flex;

}

.comment-date {
    border: 1px solid blue;
    width: 150px;
}

.comment-content {
    border: 1px solid blue;
    width: 600px;
    height: 40px;
}

.reply-section {
    border: 1px solid blue;
    width: 600px;
    display: flex;
    flex-direction: column;
}

.write-toggle-btn {
    border: 1px solid blue;
    width: 100px;
    height: 40px;
    margin: 5px;
}

.reply-textarea {
    /* display: none; */
    border: 1px solid blue;
    width: 595px;
    height: 100px;
}

.reply-form {
    border: 1px solid blue;
}

.reply-btns {
    display: flex;
    flex-direction: row;
}

.submit-reply-btn {
    border: 1px solid blue;
    width: 100px;
    height: 40px;
    margin: 5px;
}

.comment-edit-btn {
    border: 1px solid blue;
    width: 100px;
    height: 40px;
    margin: 5px;
}
</style>
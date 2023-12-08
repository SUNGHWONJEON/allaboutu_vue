<template>
    <div class="comment-container" v-for="comment in comments" :key="comment.commentNum">
        <div class="comment-profile-section">
            <ProfileHeader :writer="comment.writer" />
            
            <!-- 댓글 작성일시 -->
            <div class="comment-date">
                {{ formattedCreateDate(comment.createDate) }}
            </div>
            <div class="comment-context-menu">
                <button @click="editComment(comment)">수정</button>
                <button @click="deleteComment(comment.commentNum)">삭제</button>
            </div>
        </div>
        <div class="comment-content" v-if="isEditing !== comment.commentNum">
            {{ comment.content }}
        </div>
        <div v-else class="comment-edit-area">
            <textarea
                v-model="comment.content"
                class="comment-edit-textarea"
                @input="autoResize($event.target)"
                :ref="'comment-edit-textarea-' + comment.commentNum"
            ></textarea>
            <div class="comment-edit-btns">
                <button @click="saveComment(comment)">수정</button>
                <button @click="cancelEdit(comment)">취소</button>
            </div>
        </div>
        
        <div class="reply-section">
            <div class="reply-btns">
                <button class="write-toggle-btn" @click="toggleReplyForm(comment.commentNum)">
                    <span v-if="showReplyForm === comment.commentNum">답글 취소</span>
                    <span v-else>답글 달기</span>
                </button>
                <button v-show="showReplyForm === comment.commentNum" class="submit-reply-btn" @click="postReply(comment.commentNum)">답글 등록</button>
            </div>
            <div class="reply-form" v-show="showReplyForm === comment.commentNum">
                <textarea
                    class="reply-textarea"
                    v-model="replyText"
                    @input="autoResize($event.target)"
                    :ref="'reply-textarea-' + comment.commentNum"
                    placeholder="답글을 입력하세요."
                ></textarea>
            </div>
            
        </div>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';
import moment from 'moment';
import 'moment/locale/ko';

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
    emits: ['reply-posted', 'comment-deleted'],
    methods: {
        toggleReplyForm(commentNum) {
            // 버튼 클릭 시 답글 폼 토글
            this.$refs['reply-textarea-' + commentNum][0].style.height = 'initial';
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

                    // 부모 컴포넌트로 답글이 등록되었음을 알림
                    this.$emit('reply-posted');
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
            this.$nextTick(() => {
                const textarea = this.$refs['comment-edit-textarea-' + comment.commentNum];
                this.autoResize(textarea[0]);
            });
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
                    alert('댓글이 삭제되었습니다.');
                    this.$emit('comment-deleted');
                })
                .catch(err => {
                    alert('댓글 삭제에 실패하였습니다.')
                    console.log(err);
                });
        },
        formattedCreateDate(createDate) {
            return moment(createDate).fromNow();
        },
        autoResize(textarea) {
            // const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        },
    }
}
</script>

<style scoped>
textarea {
    resize: none;
    overflow-y: hidden;
}

.comment-container {
    border: 1px solid gray;
    border-radius: 15px;
    width: 580px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
}
.comment-profile-section {
    width: 579px;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid gray;
}

.comment-date {
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.comment-content {
    width: 590px;
    padding: 10px;
    word-break: break-all;
}
.comment-edit-area {
    border-bottom: 1px solid gray;
    background-color: mistyrose;
    width: 588px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
.comment-edit-textarea {
    border: 1px solid gray;
    background-color: white;
    padding: 10px;
    width: 100%;
}

.reply-section {
    width: 600px;
    display: flex;
    flex-direction: column;
}

.reply-form {
    width: 590px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.reply-textarea {
    border: 1px solid gray;
    width: 98%;
    margin-bottom: 10px;
}

.reply-btns {
    display: flex;
    flex-direction: row;
}
.reply-btns button {
    border: 1px solid gray;
    margin: 5px;
    padding: 5px;
}

.comment-edit-btns button {
    border: 1px solid gray;
    background-color: white;
    margin: 10px 10px 10px 0px;
    padding: 5px;
}

.comment-context-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
}

.comment-context-menu button {
    border: 1px solid gray;
    margin: 5px;
    padding: 5px;
}

</style>
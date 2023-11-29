<template>
    <div class="comment-container" v-for="comment in comments" :key="comment.commentNum">
        <div class="comment-profile-section">
            <ProfileHeader />
            
            <!-- 댓글 작성일시 -->
            <div class="comment-date">
                1시간 전
            </div>
        </div>
        <div class="comment-content">
            댓글 내용
        </div>
        <div class="reply-section">
            <button class="write-toggle-btn" @click="toggleReplyForm(comment.commentNum)">답글 쓰기</button>
            <div class="reply-form" v-show="showReplyForm === comment.commentNum">
                <textarea class="reply-textarea"></textarea>
                <div class="reply-form-div" contenteditable="true"></div>
                <div class="reply-form-bottom">
                    <button class="submit-reply-btn" @click="postReply(comment.commentNum)">답글 등록</button>
                </div>
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
                id: Math.random(), // 서버로부터 부여받은 ID
                text: this.replyText
            };  
            const targetComment = this.comments.find(comment => comment.commentNum === commentNum);
            if (targetComment) {
                targetComment.replies = targetComment.replies || [];
                targetComment.replies.push(newReply);
            }

            // 답글 작성 폼 닫기
            this.showReplyForm = null;
            this.replyText = '';
        },
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
    display: none;
}

.reply-form {
    border: 1px solid blue;
}

.reply-form-div {
    border: 1px solid blue;
    width: 595px;
    height: 100px;
}

.reply-form-bottom {
    display: flex;
    flex-direction: row-reverse;
}

.submit-reply-btn {
    border: 1px solid blue;
    width: 100px;
    height: 40px;
    margin: 5px;
}
</style>
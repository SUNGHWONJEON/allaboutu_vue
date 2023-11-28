<template>
    <div class="comment-container">
        <div class="comment-profile-section">
            <ProfileHeader />
            
            <!-- 댓글 작성일시 -->
            <div class="comment-date">
                1시간 전
            </div>
        </div>
        <div class="comment-content">
            
        </div>
        <div class="reply-section">
            <button @click="toggleReplyForm(comment.id)">답글 쓰기</button>
            <div v-if="showReplyForm === comment.id">
                <textarea v-model="replyText"></textarea>
                <button @click="postReply(comment.id)">답글 등록</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';

export default {
    name: 'BaordComment',
    components: {
        ProfileHeader,
    },
    data() {
        return {
            comments: ['댓글1', '댓글2', '댓글3'], // 서버로부터 받은 댓글 목록
            showReplyForm: null, // 댓글에 대한 답글 폼을 
            replyText: '', // 답글 텍스트
        }
    },
    methods: {
        toggleReplyForm(commentId) {
            // 버튼 클릭 시 답글 폼 토글
            this.showReplyForm = this.showReplyForm === commentId ? null : commentId;
            this.replyText = ''; // 토글할 때마다 텍스트 초기화
        },
        postReply(commentId) {
            // replyText를 DB에 등록하는 로직
            const newReply = {
                id: Math.random(), // 서버로부터 부여받은 ID
                text: this.replyText
            };
            const targetComment = this.comments.find(comment => comment.id === commentId);
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
    width: 100px;
}

.hidden {
    display: none;
}
</style>
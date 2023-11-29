<template>
    <div class="comment-section">
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
                <button @click="toggleReplyForm(comment.commentNum)">답글 쓰기</button>
                <div v-if="showReplyForm === comment.commentNum">
                    <textarea v-model="replyText"></textarea>
                    <button @click="postReply(comment.commentNum)">답글 등록</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BoardComment from './Comment.vue';

export default {
    name: 'CommentList',
    components: {
        BoardComment,
    },
    props: {
        comments: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            comments: [],     // 서버로부터 받은 댓글 목록
            showReplyForm: null, // 댓글에 대한 답글 폼을 보일지 여부를 결정하는 변수
            replyText: ''     // 답글 텍스트
        }
    },
    methods: {
        toggleReplyForm(commentNum) {
            // 버튼을 클릭하면 해당 댓글에 대한 답글 폼을 토글합니다.
            this.showReplyForm = this.showReplyForm === commentId ? null : commentId;
            this.replyText = ''; // 폼을 토글할 때마다 텍스트를 초기화합니다.
        },
        postReply(commentNum) {
            // 답글을 서버에 등록하는 로직을 작성하세요.
            // this.replyText에는 답글 텍스트가 들어 있습니다.
            // 서버와의 통신, 댓글 목록 갱신 등을 수행합니다.
            // 이 예제에서는 단순히 댓글 목록을 갱신하는 것으로 대체합니다.
            const newReply = {
                id: Math.random(), // 실제로는 서버에서 할당된 ID를 사용해야 합니다.
                text: this.replyText
            };
            const targetComment = this.comments.find(comment => comment.id === commentId);
            if (targetComment) {
                targetComment.replies = targetComment.replies || [];
                targetComment.replies.push(newReply);
            }

            // 답글 작성 폼을 닫습니다.
            this.showReplyForm = null;
            this.replyText = '';
        }
    }
}
</script>

<style>
.comment-section {
    border: 1px solid blue;
}
</style>
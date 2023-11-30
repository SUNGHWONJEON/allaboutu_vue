<template>
    <div class="board-container">
        <ProfileHeader />
        <div class="board-title-section">
            <div class="board-category">
                카테고리
            </div>
            <div class="board-title">
                {{ board.boardTitle }}
            </div>
            <div class="board-date">
                { 게시일 }
            </div>
        </div>
        <div class="board-content">
            {{ board.boardContent }}
        </div>
        <!-- (댓글수, 좋아요수, 조회수) -->
        <div class="info-section">
            <div class="like-count">
                <img class="like-full-icon" src="@/assets/images/community/like_full.jpeg">
                { 좋아요수 }
            </div>
            <div class="comment-count">
                <img class="comment-icon" src="@/assets/images/community/comment_icon.png">
                { 댓글수 }
            </div>
            <div class="read-count">
                조회수 { 조회수 }
            </div>
        </div>
        
        <!-- 댓글 목록 -->
        <Comment :comments="this.comments" />
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';
import CommentList from './CommentList.vue';
import Comment from './Comment.vue';

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
        }
    },
    created() {
        console.log(this.board)
        console.log(this.comments)
    },
}
</script>

<style>
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
    height: 150px;
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

.like-full-icon {
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
</style>
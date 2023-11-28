<template>
    <div class="board-container">
        <ProfileHeader />
        <BoardBody />
        <BoardInfo />
        <CommentList :comments="boardComments" />
    </div>
</template>

<script>
import ProfileHeader from './ProfileHeader.vue';
import BoardBody from './BoardBody.vue';
import BoardInfo from './BoardInfo.vue';
import CommentList from './CommentList.vue';

export default {
    name: 'Board',
    components: {
        ProfileHeader,
        BoardBody,
        BoardInfo,
        CommentList
    },
    data() {
        return {
            boardComments: [
                {
                    id: 1,
                    text: '댓글1'
                },
                {
                    id: 2,
                    text: '댓글2'
                }
            ]
        }
    }
}
</script>

<style>
.board-container {
    border: 1px solid blud;
    width: 600px;
    margin: 10px;
}
</style>
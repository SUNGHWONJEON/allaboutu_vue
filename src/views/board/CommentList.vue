<template>
    <div class="comment-section">
        <div>
            <ul>
                <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
            </ul>
        </div>

        <!-- <BoardComment /> -->
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
    }
}
</script>

<style>
.comment-section {
    border: 1px solid blue;
}
</style>
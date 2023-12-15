<template>
    <div class="profile-section">
        <div class="profile-image">
            <img src="@/assets/images/community/chatbot_icon.png" v-if="writer.userProfile == null">
            <img :src="'/member/image/' + writer.userProfile" v-else>
        </div>
        <div class="profile-text">
            <div class="profile-name div-flex-bottom">
                {{ writer.userName }}({{ writer.userId }})
            </div>
            <div class="profile-hashtag div-flex-top">
                {{ hashtags }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileHeader',
    props: {
        writer: 'writer',
    },
    computed: {
        hashtags() {
            var hashtags = '';

            console.log('writer: ', this.writer);
            this.writer.hashtags.forEach(hashtag => {
                hashtags += '#' + hashtag.hashtagName + ' ';
            });
            return hashtags;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/board.scss';
</style>    
<template>
    <div class="profile-section">
        <div class="profile-image">
            <img src="@/assets/images/community/chatbot_icon.png" v-if="writer.userProfile == null">
            <img :src="'/member/image/' + writer.userProfile" v-else>
        </div>
        <div class="profile-text">
            <div class="profile-name div-flex-middle">
                {{ writer.userName }}({{ writer.userId }})
            </div>
            <div class="profile-hashtag div-flex-middle">
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
            this.writer.hashtags.forEach(hashtag => {
                hashtags += '#' + hashtag.hashtagName + ' ';
            });
            return hashtags;
        }
    },
    mounted() {
        console.log(this.writer);
    },
}
</script>

<style scoped>
.div-flex-middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.profile-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
}

.profile-image {
    border-radius: 20px;
    width: 50px;
    display: flex;
    align-items: center;
    height: 50px;
}

.profile-image img {
    border-radius: 20px;
    width: 50px;
    height: 50px;
    margin: auto;
}

.profile-text {
    width: 100%;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.profile-text div {
    height: 25px;
    margin-left: 10px;
}
.profile-name {
    font-size: 15px;
    font-weight: bold;
}
.profile-hashtag {
    font-size: 13px;
    color: gray;
}
</style>
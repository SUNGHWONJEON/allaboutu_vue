<template>
    <div class="profile-section">
        <div class="profile-image">
            <img src="@/assets/images/community/chatbot_icon.png">
        </div>
        <div class="profile-text">
            <div class="profile-name">
                {{ userName }}({{ userId }})
            </div>
            <div class="profile-hashtag">
                해시태그
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileHeader',
    props: {
        userId: 'userId',
        userName: 'userName',
    }
}
</script>

<style>
.profile-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50px;
    border: 1px solid green;
}

.profile-image {
    width: 50px;
    display: flex;
    align-items: center;
    height: 50px;
}

.profile-image img {
    width: 50px;
    height: 50px;
    margin: auto;
}

.profile-text {
    border: 1px solid blue;
    width: 100%;
    height: 100%;
    text-align: left;
}

.profile-text div {
    height: 25px;
}
</style>
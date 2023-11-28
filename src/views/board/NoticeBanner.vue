<template>
    <!-- 시간이 지날때 마다 공지사항이 다음 공지사항으로 넘어감 -->
    <!-- 공지사항 배너는 최대 3개의 공지사항이 순서대로 돌아감 -->
    <!-- 단, 필독 공지사항과 진행중 이벤트가 4개 이상일 경우, 해당 개수만큼 돌아감 -->
    <div class="notice-banner">
        <div class="notice-no">
            번호
        </div>
        <div class="notice-title">
            제목
        </div>
        <div class="notice-date">
            날짜
        </div>
        <div class="up-down-button">
            ▲<br>
            ▼
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoticeBanner',
    data() {

    },
    methods: {
        
    },
}
</script>

<style>
.notice-banner {
    border: 1px solid orange;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 640px;
    height: 50px;
}

.notice-no {
    width: 10%;
}

.notice-title {
    width: 70%;
}

.notice-date {
    width: 15%;
}

.up-down-button {
    width: 5%;
}
</style>
<template>
    <!-- 시간이 지날때 마다 공지사항이 다음 공지사항으로 넘어감 -->
    <!-- 공지사항 배너는 최대 3개의 공지사항이 순서대로 돌아감 -->
    <!-- 단, 필독 공지사항과 진행중 이벤트가 4개 이상일 경우, 해당 개수만큼 돌아감 -->
    <div class="notice-banner">
        <button @click="prevNotice">◀</button><br>
        <div class="notice-no">
            {{ currentNotice.noticeNum }}
        </div>
        <div class="notice-title">
            <router-link :to="'/notice/detail/' + this.currentNotice.noticeNum">
                {{ currentNotice.noticeTitle }}
            </router-link>
        </div>
        <div class="notice-date">
            {{ currentNotice.writeDate }}
        </div>
        <button @click="nextNotice">▶</button>
    </div>
</template>

<script>
export default {
    name: 'NoticeBanner',
    data() {
        return {
            noticeList: [],
            currentNoticeIndex: 0,
        }
    },
    computed: {
        currentNotice() {
            return this.noticeList[this.currentNoticeIndex] || {};
        },
    },
    methods: {
        prevNotice() {
            this.currentNoticeIndex = (this.currentNoticeIndex - 1 + this.noticeList.length) % this.noticeList.length;
        },
        nextNotice() {
            this.currentNoticeIndex = (this.currentNoticeIndex + 1) % this.noticeList.length;
        },
    },
    created() {
        this.$axios.get('/notice', {
            params: {
                search_key: 'noticeType',
                search_value: '필독',
                page: 0,
            },
        })
        .then((res) => {
            this.noticeList = res.data.content;
        })
        .catch((err) => {
            console.error(err);
        });
    },
    mounted() {
        setInterval(this.nextNotice, 10000);
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

.notice-banner div {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.notice-no {
    width: 10%;
}

.notice-title {
    width: 65%;
}

.notice-date {
    width: 15%;
}

.notice-banner button {
    width: 5%;
}
</style>
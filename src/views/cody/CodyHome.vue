<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            CODY
        </div>
        <div class="pic-titile-sub">
            추천 코디를 선택해보세요.
        </div>
    </div>

    <div class="cody-box">
        <div class="cody-listbox">
            <button class="cody-list" 
                v-for="cody in codyList" :key="cody"
                @click="fnListClick(cody)">
                <img :src="cody.img" >
                <img class="cody-list-simg" src="@/assets/images/cody/picup.png">
            </button>
        </div>
        
        <!-- 페이징 버튼 추가 -->
        <div class="page-box">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">이전</button>
            <button class="page-btn" @click="movePage(pageNumber)" v-for="pageNumber in pageNumbers" :key="pageNumber"> {{ pageNumber }}</button>
            <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
        </div>
    </div>
</template>

<script>
export default ({
    data() {
        return {
            codyList : [],
            currentPage: 1,
            totalPages: 1,
        }
    },
    mounted() {
        //코디 불러오기
        this.$axios.get('/cody')
        .then((res) => {
            console.log('res.data.codyList : ' + res.data.codyList);
            this.codyList = res.data.codyList;
        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {
        fnPage() {
            this.$axios
                .get('/cody', {
                    params: {
                        search_key: this.search_key,
                        search_value: this.search_value,
                        page: this.currentPage - 1,
                    },
                    })
                    .then((res) => {
                    this.list = res.data.content;
                    this.totalPages = res.data.totalPages;
                    })
                    .catch((err) => {
                    console.error(err);
                });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fnPage();
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fnPage();
            }
        },
        movePage(pageNumber){
            this.currentPage = pageNumber;
            this.fnPage();
        },
        fnListClick(cody) {
            console.log('list-click : '+cody);
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cody.scss';
</style>
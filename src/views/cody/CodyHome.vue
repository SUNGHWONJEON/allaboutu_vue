<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            CODY
        </div>
        <div class="pic-titile-sub">
            {{ styleTitle[this.$styleType.formNum - 1] }}의 추천 코디를 선택해보세요.
        </div>
    </div>

    <div class="cody-box">
        <div class="cody-listbox">
            <button class="cody-list" 
                v-for="cody in codyList" :key="cody"
                @click="fnListClick(cody)">
                <img class="cody-list-img" :src="'/cody/image/'+cody.codyImgList[0].codyImg" >
                <img class="cody-list-simg" src="@/assets/images/cody/picup.png">
            </button>
        </div>
        
        <!-- 페이징 버튼 추가 -->
        <div class="page-box">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1" :class="{ disabled: currentPage === 1 }">이전</button>
            <button class="page-btn" @click="movePage(i)" v-for="i in totalPages" :key="i"> {{ i }}</button>
            <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages" :class="{ disabled: currentPage === totalPages }">다음</button>
        </div>
    </div>
</template>

<script scope>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default ({
    data() {
        return {
            codyList : [],
            pageable :{},
            pageSize: 12,
            currentPage: 1,
            totalPages: 1,
            styleTitle: [
                '역삼각형'
                ,'모래시계형'
                ,'사각체형'
                ,'둥근체형'
                ,'삼각체형'
            ]
        }
    },
    mounted() {

        console.log('this.$route.query.formNum : ' + this.$route.query.formNum)

        //코디 불러오기
        this.$axios.get('/cody', {
            params: {
                formNum: this.$route.query.formNum,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            }
        })
        .then((res) => {
            console.log('res.data.content : ' + JSON.stringify(res.data.content));
            this.codyList = res.data.content;
            console.log('this.codyList : ' + this.codyList);
            this.totalPages = Math.ceil(this.codyList[0].codyCount / this.pageSize);
            console.log('this.codyList : ' + JSON.stringify(this.codyList));
            console.log('this.totalPages : ' + this.totalPages);
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
            this.$styleType.cody = cody;
            const encodedQuery = encodeURIComponent(JSON.stringify(cody));

            this.$router.push({
                name: 'CodyDetail'
                ,query: {
                    cody: encodedQuery
                }
            })
            
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cody.scss';
</style>
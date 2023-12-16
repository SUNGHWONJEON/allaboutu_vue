<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <div class="pic-titile">
                    Cody Select
                </div>
                <div class="pic-titile-sub">
                    코디를 조회하세요.
                </div>
                <button class="insert-btn" @click="onInsert">코디 등록</button>
                
                <div class="cody-insert-box select-box">
                    <div class="cody-list-sel" v-for="cody in codyList" :key="cody">
                        <div class="cody-list-title">코디 번호 - {{ cody.codyNum }}</div>
                        <table>
                            <tr>
                                <th class="table-th">
                                    체형
                                </th>
                                <th>
                                    코디 제목
                                </th>
                                <th>
                                    코디 내용
                                </th>
                                <th>
                                    모델 이름
                                </th>
                                <th>
                                    모델 키
                                </th>
                                <th>
                                    모델 몸무게
                                </th>
                                <th>
                                    모델 사진
                                </th>
                                <th>
                                    삭제
                               </th>
                            </tr>
                            <tr>
                                <td class="text-center">
                                    {{ cody.formNum }}
                                </td>
                                <td>
                                    {{ cody.codyTitle }}
                                </td>
                                <td>
                                    {{ cody.codyContent }}
                                </td>
                                <td>
                                    {{ cody.modelName }}
                                </td>
                                <td>
                                    {{ cody.modelHeight }}
                                </td>
                                <td>
                                    {{ cody.modelWeight }}
                                </td>
                                <td>
                                    <img :src="'/cody/image/'+cody.modelReImg">
                                </td>
                                <td class="text-center">
                                    <button class="delete-btn" @click="onDelete('cody', cody.codyNum)">삭제</button>
                                </td>
                            </tr>
                        </table>

                        <table>
                            <tr>
                               <th class="table-th text-center">
                                    이미지 번호
                               </th>
                               <th>
                                    코디 이미지
                               </th>
                               <th>
                                    삭제
                               </th>
                            </tr>
                            <tr v-for="codyImg in cody.codyImgList" :key="codyImg">
                                <td>
                                    {{ codyImg.codyImgNum }}
                                </td>
                                <td>
                                    <img :src="'/cody/image/'+codyImg.codyReImg">
                                </td>
                                <td class="text-center">
                                    <button class="delete-btn" @click="onDelete('codyImg', codyImg.codyImgNum)">삭제</button>
                                </td>
                            </tr>
                            
                        </table>

                        <table>
                            <tr>
                               <th class="table-th">
                                    상품 번호
                               </th>
                               <th>
                                    상품 이름
                               </th>
                               <th>
                                    브랜드 이름
                               </th>
                               <th>
                                    상품 가격
                               </th>
                               <th>
                                    상품 사이즈
                               </th>
                               <th>
                                    상품 링크
                               </th>
                               <th>
                                    상품 이미지
                               </th>
                               <th>
                                    삭제
                               </th>
                            </tr>
                            <tr v-for="goods in cody.goodsList" :key="goods">
                                <td class="text-center">
                                    {{ goods.goodsNum }}
                                </td>
                                <td>
                                    {{ goods.goodsName }}
                                </td>
                                <td>
                                    {{ goods.brandName }}
                                </td>
                                <td>
                                    {{ goods.goodsPrice }}
                                </td>
                                <td>
                                    {{ goods.goodsSize }}
                                </td>
                                <td>
                                    {{ goods.goodsLink }}
                                </td>
                                <td>
                                    <img :src="'/cody/image/'+goods.goodsReImg">
                                </td>
                                <td class="text-center">
                                    <button class="delete-btn" @click="onDelete('goods', goods.goodsNum)">삭제</button>
                                </td>
                            </tr>
                        </table>

                        <div class="bottom-line"></div>

                    </div>
                    
                </div>

                <!-- 페이징 버튼 추가 -->
                <div class="page-box">
                    <button class="page-btn" @click="prevPage" :disabled="currentPage === 1" :class="{ disabled: currentPage === 1 }">이전</button>
                    <button class="page-btn" @click="movePage(i)" v-for="i in totalPages" :key="i"> {{ i }}</button>
                    <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages" :class="{ disabled: currentPage === totalPages }">다음</button>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

export default ({
    data() {
        return {
            search_key: '',
            codyList : [],
            pageable :{},
            pageSize: 12,
            currentPage: 1,
            totalPages: 1,
        }
    },
    mounted() {
        //코디 불러오기
        this.fnPage();

    },
    methods: {
        fnPage() {
            //코디 불러오기
            this.$axios.get('/cody/all', {
                params: {
                    //search_key: this.search_key,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            })
            .then((res) => {
                console.log('all = res.data.content : ' + JSON.stringify(res.data.content));
                this.codyList = res.data.content;
                console.log('all = this.codyList : ' + this.codyList);
                this.totalPages = Math.ceil(this.codyList[0].codyCount / this.pageSize);
                console.log('all = this.codyList : ' + JSON.stringify(this.codyList));
                console.log('all = this.totalPages : ' + this.totalPages);
            }).catch((err) => {
                console.log(err);
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
        onInsert(){
            this.$router.push({'path' : '/style/codyselect'});
        },
        onDelete(type, num){
            console.log('type : ' + type);
            console.log('num : ' + num);

            if(confirm('정말 삭제하시겠습니까?')){
                this.$axios.delete('/cody/all', {
                    params: {
                        //search_key: this.search_key,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                })
                .then((res) => {
                    console.log('all = res.data.content : ' + JSON.stringify(res.data.content));
                    this.codyList = res.data.content;
                    console.log('all = this.codyList : ' + this.codyList);
                    this.totalPages = Math.ceil(this.codyList[0].codyCount / this.pageSize);
                    console.log('all = this.codyList : ' + JSON.stringify(this.codyList));
                    console.log('all = this.totalPages : ' + this.totalPages);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cody_insert.scss';


table {
    max-width: 900px;

    img {
        width: 30px;
        height: 30px;
    }
}


</style>
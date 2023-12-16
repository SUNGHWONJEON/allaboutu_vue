<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">

                <div class="pic-title-box">
                    <div class="pic-titile">
                        CODY DETAIL
                    </div>
                    <div class="pic-titile-sub">
                        {{ cody.codyTitle }}
                    </div>
                </div>

                <div class="cody-box">
                    <div class="cody-content">
                        {{ cody.codyContent }}
                    </div>

                    <div class="cody-slide">
                        <carousel 
                            :autoplay="false"
                            :wrap-around="true"
                        >
                            <slide v-for="codyItem in codyImgList"
                                :key="codyItem"
                                class="slide-item"
                            >
                                <img :src="'/cody/image/' + codyItem.codyReImg">
                            </slide>

                            <template #addons>
                                <navigation />
                                <pagination />
                            </template>
                        </carousel>
                    </div>

                    <div class="model-box">
                        <img :src="'/cody/image/'+cody.modelReImg" >
                        <div class="model-str-box">
                            <div class="model-str">{{ cody.modelName }}</div>
                            <div class="model-str">{{ cody.modelHeight }}cm, {{ cody.modelWeight }}kg</div>
                        </div>
                    </div>

                    <div class="goods-box">
                        <div class="goods-title">
                            모델 착용 상품
                        </div>
                        <div class="goods-list-box">
                            <button class="goods-list" 
                                v-for="goods in goodsList" :key="goods"
                                @click="goodsLink(goods.goodsLink)"
                            >
                                <img :src="'/cody/image/'+goods.goodsReImg">
                                <div class="brand-name">{{ goods.brandName }}</div>
                                <div class="goods-name">{{ goods.goodsName }}</div>
                                <div class="goods-price">{{ goods.goodsPrice }}</div>
                                
                                <div class="goods-size">{{ goods.goodsSize }}</div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    

</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default ({
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            cody: {},
            goodsList: [],
            codyImgList: [],
        }
    },
    mounted() {
        //this.cody = this.$styleType.cody;
        const query_cody = this.$route.query.cody;
        console.log('query_cody:', query_cody);
        const decodedQuery = JSON.parse(decodeURIComponent(query_cody));
        this.cody = decodedQuery;
        console.log('cody:', JSON.stringify(decodedQuery));
        this.goodsList = this.cody.goodsList;
        this.codyImgList = this.cody.codyImgList;

        return
        this.cody = {
            "codyNum":1,
            "formNum":1,
            "codyTitle":"트렌디하게",
            "codyContent":"후드 디테일의 니트와 롱 코트를 매치하고 워싱 팬츠로 마무리한 캐주얼 룩",
            "modelName":"유예린",
            "modelImg":"model_1.jpg",
            "modelHeight":170,
            "modelWeight":44,
            "goodsList":[
                {"goodsNum":1, "codyNum":1, "goodsImg":"goods_1_1_1.jpg", 
                "goodsName":"[울블렌드] 벨티드 발마칸 코트_SPJWD4VW01",
                "brandName":"스파오","goodsPrice":"129,000원","goodsSize":"[19]BLACK,S[085] 착용",
                "goodsLink":"https://www.musinsa.com/app/goods/3460303"},
                {"goodsNum":1, "codyNum":1, "goodsImg":"goods_1_1_1.jpg", 
                "goodsName":"[울블렌드] 벨티드 발마칸 코트_SPJWD4VW01",
                "brandName":"스파오","goodsPrice":"129,000원","goodsSize":"[19]BLACK,S[085] 착용",
                "goodsLink":"https://www.musinsa.com/app/goods/3460303"},
                {"goodsNum":1, "codyNum":1, "goodsImg":"goods_1_1_1.jpg", 
                "goodsName":"[울블렌드] 벨티드 발마칸 코트_SPJWD4VW01",
                "brandName":"스파오","goodsPrice":"129,000원","goodsSize":"[19]BLACK,S[085] 착용",
                "goodsLink":"https://www.musinsa.com/app/goods/3460303"},
                {"goodsNum":1, "codyNum":1, "goodsImg":"goods_1_1_1.jpg", 
                "goodsName":"[울블렌드] 벨티드 발마칸 코트_SPJWD4VW01",
                "brandName":"스파오","goodsPrice":"129,000원","goodsSize":"[19]BLACK,S[085] 착용",
                "goodsLink":"https://www.musinsa.com/app/goods/3460303"},
                {"goodsNum":1, "codyNum":1, "goodsImg":"goods_1_1_1.jpg", 
                "goodsName":"[울블렌드] 벨티드 발마칸 코트_SPJWD4VW01",
                "brandName":"스파오","goodsPrice":"129,000원","goodsSize":"[19]BLACK,S[085] 착용",
                "goodsLink":"https://www.musinsa.com/app/goods/3460303"}
            ],
            "codyImgList":[
                {"codyImgNum":1,"codyNum":1,"codyImg":"cody_1_1_1.jpg"},
                {"codyImgNum":2,"codyNum":1,"codyImg":"cody_1_1_2.jpg"},
                {"codyImgNum":3,"codyNum":1,"codyImg":"cody_1_1_3.jpg"},
                {"codyImgNum":4,"codyNum":1,"codyImg":"cody_1_1_4.jpg"}
            ],
            "codyCount":1
        }

        this.goodsList = this.cody.goodsList;
        this.codyImgList = this.cody.codyImgList;
    },
    methods: {
        goodsLink(link) {
            window.open(link, '_blank');
        }
    },
})
</script>

<style scoped>
@import '@/assets/scss/cody.scss';

/*슬라이드*/
.carousel__prev,
  .carousel__next {
    background: url(@/assets/images/prevBtn.png);
    height: 48px;
    width: 48px;
    box-shadow: none;
}

.carousel__next {
    background: url(@/assets/images/nextBtn.png);
}
  
.carousel__icon path{
    display: none;
}

.carousel__pagination {
    margin-top: -30px;
    position: relative;
    z-index: 999;
}
.carousel__pagination-button::after {
    border-radius: 5px;
    background-color: #fff;
    width: 50px;
    height: 6px;
}

.carousel__pagination-button--active::after{
    background-color: #ad578c;
}
</style>
<template>
    
    <!--main-container-->
    <div class="main-container margin-top-70">
        <div class="txt-box" data-aos="fade-up">
            <div class="title-text">Personal color</div>
            <div class="sub-text">내속에 숨겨져 있던<br>진정 아름다운 나를 찾아서</div>
        </div>
        <div class="main-con main-style">
            <div class="thumbnail-list">
                <button class="thumbnail-box" data-aos="zoom-in"
                    v-for="colorItem in colorList" :key="colorItem"
                >
                        <div class="thumbnail color">
                            <img :src="colorItem.img">
                        </div>
                        <div class="description">
                            <strong class="displayTitle name">
                                <span style="font-size: 20px;">{{ colorItem.title }}</span>
                            </strong>
                        </div>
                    
                </button>
            </div>
        </div>
        <!--
        <div class="main-con main-style">
            <div class="thumbnail-list">
                <div class="thumbnail-box" data-aos="zoom-in">
                    <div class="thumbnail">
                        <img src="https://lulugine.com/web/product/big/202310/76e7f277900262f27276d66bc84906c2.jpg">
                    </div>
                    <div class="description">
                            <strong class="displayTitle name">
                                <span>룰루진 엘리트 트리진세노믹스 매끈보들 클렌징젤 160ml</span>
                            </strong>
                            <ul class="description-ul">
                                <li class="displayPrice">
                                    <span>26,000원</span>
                                </li>
                                <li class="displayData">
                                    <span>수분은 지켜주고 자극은 줄인    촉촉  깔끔  순둥이 클렌징젤</span>
                                </li>
                                <li class="displayReview">
                                    <strong class="title ">
                                        <span>Review</span> :
                                    </strong> 
                                    <span>13</span>
                                </li>
                            </ul>
                        </div>
                </div>
                <div class="thumbnail-box" data-aos="zoom-in">
                    <div class="thumbnail"></div>
                </div>
                <div class="thumbnail-box" data-aos="zoom-in">
                    <div class="thumbnail"></div>
                </div>
                <div class="thumbnail-box" data-aos="zoom-in">
                    <div class="thumbnail"></div>
                </div>
            </div>
            
        </div>
        -->
    </div>
    <!--main-container end-->
    
    <!--main-container-->
    <div class="main-container margin-top-50">
        <div class="txt-box" data-aos="fade-up">
            <div class="title-text">Style</div>
            <div class="sub-text">내속에 숨겨져 있던<br>진정 아름다운 나를 찾아서</div>
        </div>

        <div class="main-con main-style">
            <div class="thumbnail-list">
                <button class="thumbnail-box" data-aos="zoom-in"
                    v-for="styleItem in styleList" :key="styleItem"
                >
                        <div class="thumbnail">
                            <img :src="styleItem.img">
                        </div>
                        <div class="description">
                            <strong class="displayTitle name">
                                <span>{{ styleItem.title }}</span>
                            </strong>
                        </div>
                    
                </button>
            </div>
            
        </div>
    </div>
    <!--main-container end-->

    <!--main-container-->
    <div class="main-container margin-top-50">
        <div class="txt-box" data-aos="fade-up">
            <div class="title-text">Face</div>
            <div class="sub-text">내속에 숨겨져 있던<br>진정 아름다운 나를 찾아서</div>
        </div>

        <div class="main-con main-style">
            <div class="thumbnail-list">
                <div class="thumbnail-box" data-aos="zoom-in"
                    v-for="faceItem in faceList" :key="faceItem"
                >
                    <div class="thumbnail color">
                        <img :src="faceItem.img">
                    </div>
                    <div class="description">
                        <strong class="displayTitle name">
                            <span style="font-size: 20px;">{{ faceItem.title }}</span>
                        </strong>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    <!--main-container end-->

    <!--main-container-->
    <div class="main-container margin-top-50">
        <div class="txt-box" data-aos="fade-up">
            <div class="title-text">Comunity</div>
            <div class="sub-text">고객님의 솔직한 리뷰 - 인기 Best5</div>
        </div>
        
        <div class="main-con main-style">
            <div class="comunity-box thumbnail-list" data-aos="fade-up">
                <BoardRank ref="board_rank"/>
            </div>
            
        </div>
    </div>
    <!--main-container end-->

</template>

<script>
import BoardRank from '../board/BoardRank.vue';

export default ({
    name: 'PageHome',
    components: {
        BoardRank
    },
    data() {
        return {
            colorList: [
                {
                    title: 'Spring',
                    text: '',
                    img: require('@/assets/images/personal/color_spring.png'),
                    path: '/personal'
                },
                {
                    title: 'Summer',
                    text: '',
                    img: require('@/assets/images/personal/color_summer.png'),
                    path: '/personal'
                },
                {
                    title: 'Autumn',
                    text: '',
                    img: require('@/assets/images/personal/color_autumn.png'),
                    path: '/personal'
                },
                {
                    title: 'Winter',
                    text: '',
                    img: require('@/assets/images/personal/color_winter.png'),
                    path: '/personal'
                }
                
            ],
            styleList: [
                {
                    title: '역삼각형',
                    text: '',
                    img: require('@/assets/images/style/style_1.png'),
                    path: '/style'
                },
                {
                    title: '모래시계형',
                    text: '',
                    img: require('@/assets/images/style/style_2.png'),
                    path: '/style'
                },
                {
                    title: '사각체형',
                    text: '',
                    img: require('@/assets/images/style/style_3.png'),
                    path: '/style'
                },
                {
                    title: '둥근체형',
                    text: '',
                    img: require('@/assets/images/style/style_4.png'),
                    path: '/style'
                },
                {
                    title: '역삼각형',
                    text: '',
                    img: require('@/assets/images/style/style_5.png'),
                    path: '/style'
                }
            ],
            faceList: [
                {
                    title: 'Blonde',
                    text: '',
                    img: require('@/assets/images/face/face_1.jpg'),
                    path: '/face'
                },
                {
                    title: 'Red',
                    text: '',
                    img: require('@/assets/images/face/face_2.jpg'),
                    path: '/face'
                },
                {
                    title: 'Green',
                    text: '',
                    img: require('@/assets/images/face/face_3.jpg'),
                    path: '/face'
                },
                {
                    title: 'Violet',
                    text: '',
                    img: require('@/assets/images/face/face_4.jpg'),
                    path: '/face'
                }
                
            ],
        }
    },
    mounted() {
        this.$refs.board_rank.getBoardRank();
    },
    
})
</script>

<style lang="scss" scoped>

</style>
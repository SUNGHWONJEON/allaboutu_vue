<template>
    <div class="main-container slider-box">
        <div class="cont-slider">
            <div v-for="slide in slides" :key="slide.id">
                <div class="slide_box">
                    <div class="main_contentsbox slide" :class="slide.type">
                        <div class="main_textbox">
                            <div class="text_large_bold slide_text_large">{{ slide.title }}</div>
                            <div class="text_large_medium slide_text_large">{{ slide.subtitle }}</div>
                            <div class="text_medium_regular slide_text_small">{{ slide.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  
export default {
    components: {

    },
    data() {
        return {
            slides: [
                {
                    id: 1,
                    type: 'type_1',
                    title: 'FACE MATCH',
                    subtitle: '내 얼굴에 맞는\n아이템은?',
                    description: '립스틱, 헤어스타일\n이제 샵에 가지 않아도 맞춰볼수 있어요!',
                },
                {
                    id: 2,
                    type: 'type_2',
                    title: 'PERSONAL COLOR',
                    subtitle: '나의 퍼스널 컬러\n궁금해~',
                    description: '퍼스널 컬러도 알아보고\n추천 화장품도 알아보는 일석이조!',
                },
                {
                    id: 3,
                    type: 'type_3',
                    title: 'STYLE MATCH',
                    subtitle: '나의 체형을 \n알아볼까?',
                    description: '체형에 맞는 스타일로 \n멋진 나의 이미지를 만들어봐요.',
                },
                {
                    id: 4,
                    type: 'type_4',
                    title: 'COMMUNITY',
                    subtitle: '다른 사람은 어떤 \n뷰티아이템을 쓸까?',
                    description: '다양한 사람들과 뷰티 관련 정보를 \n나누어 보고 후기도 볼 수 있어요~',
                },
            ],
            currentSlide: null,
            intervalId: null,
        };
    },

    created() {
        this.startSlideShow();
    },
    beforeDestroy() {
        this.stopSlideShow();
    },
    methods: {
        startSlideShow() {
            this.currentSlide = this.slides[0];
            this.intervalId = setInterval(() => {
                const currentIndex = this.slides.findIndex((slide) => slide === this.currentSlide);
                const nextIndex = (currentIndex + 1) % this.slides.length;
                this.currentSlide = this.slides[nextIndex];
            }, 3000);
        },
        stopSlideShow() {
            clearInterval(this.intervalId);
        },
    },

};
</script>
  
<style>
.slide_box {
    display: none;
}

.slide_box.active {
    display: block;
}
</style>
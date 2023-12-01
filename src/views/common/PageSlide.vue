<template>
    <carousel 
      :autoplay="4000"
      :wrap-around="true"
    >
      <slide v-for="slide in slides"
        :key="slide.id"
        class="slide-item"
      >
        <div class="main_contentsbox slide" 
          :class="slide.type" 
          ref="slideContent">
            <div class="main_textbox">
              <div class="text_large_bold slide_text_large">{{ slide.title }}</div>
              <div class="text_large_medium slide_text_large">{{ slide.subtitle }}</div>
              <div class="text_medium_regular slide_text_small">{{ slide.description }}</div>
            </div>
        </div>
      </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
  </template>
  
<script scope>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    
  data () {
    return {
        slides: [
        {
            id: 1,
            type: 'type_1',
            title: 'FACE MATCH',
            subtitle: '내 얼굴에 맞는\n아이템은?',
            description: '립스틱, 헤어스타일\n이제 샵에 가지 않아도 맞춰볼 수 있어요!',
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
        }
        ]
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  }
}
    
</script>
  
<style scope>
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
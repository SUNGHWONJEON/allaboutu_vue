<template>
    <div class="style-reco" ref="style_recommand" v-if="this.styleNum != -1">
        <div class="style-item-con">
            <div class="style-item-box" v-for="style in styles" :key="style.id">
                <button class="style-item" ref="style_btn" 
                    :class="{active: style.active}"
                    v-bind:disabled="style.active === 'active'"
                    @mouseover="button_over(style)"
                    @mouseout="button_out"
                    @click="button_click(style)"
                >
                    <img :src="style.src[style.active === 'active' ? 1 : style.index]" 
                        :alt="style.exp">
                    <div class="style-exp">{{ style.title }}</div>
                    
                </button>
            </div>
        </div>

        <div class="style-exp-box">
            <div class="style-title">{{ this.$styleType.num === this.styleNum ? 
                this.$styleType.style : this.styles[this.styleNum - 1].title }}</div>
            <button class="reco-btn" @click="onLinkCody">추천코디 보러가기</button>
            <div class="style-exp-con">
                <StyleSub ref="style_sub"/>
            </div>

        </div>
    </div>
</template>

<script>
import StyleSub from '@/views/style/StyleSub.vue';
import {ref} from "vue";

export default {
    components: {
        StyleSub
    },
    data() {
        return {
            styleNum: this.$styleType.num
            //스타일 이미지
            ,styles: [
                {
                    id: 1
                    ,src: [
                        require('@/assets/images/style/style_1.png')
                        ,require('@/assets/images/style/style_1_over.png')
                    ]
                    ,title: '역삼각형'
                    ,index: 0
                    ,active: ''
                    ,exp: 
                        '허리선를 기준으로 상반신은 크고 넓어 보이고 \
                        허리가 굵고 짧아 다리가 깁니다. \n활동적이고 남성적인 이미지의 체형입니다.'
                },
                {
                    id: 2
                    ,src: [
                        require('@/assets/images/style/style_2.png')
                        ,require('@/assets/images/style/style_2_over.png')
                    ]
                    ,title: '모래시계형'
                    ,index: 0
                    ,active: ''
                    ,exp: '상체와 하체의 균형감이 좋고 허리가 가는 체형입니다. \
                    \n곡선미가 있는 여성스러운 느낌의 체형입니다.'
                },
                {
                    id: 3
                    ,src: [
                        require('@/assets/images/style/style_3.png')
                        ,require('@/assets/images/style/style_3_over.png')
                    ]
                    ,title: '사각체형'
                    ,index: 0
                    ,active: ''
                    ,exp: '어깨 허리, 엉덩이 폭이 거의 같은 직선형의 체형입니다. \n현대적인 이미지의 체형입니다.'
                },
                {
                    id: 4
                    ,src: [
                        require('@/assets/images/style/style_4.png')
                        ,require('@/assets/images/style/style_4_over.png')
                    ]
                    ,title: '둥근체형'
                    ,index: 0
                    ,active: ''
                    ,exp: '등과 팔이 크고 둥글며 가슴과 몸통 허리, 복부, 엉덩이, 다리가 발달되어 \
                    \n신체에 살이 많아 보이는 체형입니다.'
                },
                {
                    id: 5
                    ,src: [
                        require('@/assets/images/style/style_5.png')
                        ,require('@/assets/images/style/style_5_over.png')
                    ]
                    ,title: '삼각체형'
                    ,index: 0
                    ,active: ''
                    ,exp: '좁은 어깨와 넓은 엉덩이를 가지고 있어 상반신이 작고 등이 좁으며 \
                    \n허리는 가늘고 길며 다리가 짧아 보이는 체형입니다.'
                }
            ]
            ,activeStyle: null
        }
    },
    
    mounted() {
        this.styles.forEach(item => {
            if(item.id == this.styleNum){
                this.styles[item.id-1].active = 'active';
            }
        });
        
        this.$styleType.style = '고객님의 체형은 ' + this.styles[this.$styleType.num - 1].title + '입니다.';
        this.$refs.style_sub.changeStyle(this.styleNum);
    },
    methods: {

        button_out(){
            this.styles.forEach(item => {
                item.index = 0;
            });
        },
        button_over(style){
            if(this.styles[style.id-1].active == 'active') return; 
            this.button_out();
            this.styles[style.id-1].index = 1;
        },
        button_click(style){
            this.styleNum = style.id
            if(this.styles[style.id-1].active == 'active') return;
            this.styles.forEach(item => {
                item.active = '';
            });
            
            this.styles[style.id-1].active = 'active';
            this.$refs.style_sub.changeStyle(this.styleNum);
        },
        onLinkCody(){
            console.log('this.$styleType.num : ' + this.$styleType.num);
            this.$styleType.formNum = this.styleNum;
            this.$router.push({
                name: 'CodyMain',
                query: {formNum : this.styleNum}
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

</style>
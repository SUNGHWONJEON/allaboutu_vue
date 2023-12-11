<template>
<div class="personal-reco" ref="personal_recommand" v-if="this.personalNum != -1">
        <div class="personal-item-con">
            <div class="personal-item-box" v-for="personal in personals" :key="personal.id">
                <button class="personal-item" ref="personal_btn" 
                    :class="{active: personal.active}"
                    v-bind:disabled="personal.active === 'active'"
                    @mouseover="button_over(personal)"
                    @mouseout="button_out"
                    @click="button_click(personal)"
                >
                    <img :src="personal.src[personal.active === 'active' ? 1 : personal.index]" 
                        :alt="personal.exp">
                    <div class="personal-exp">{{ personal.title }}</div>
                    
                </button>
            </div>
        </div>

        <div class="personal-exp-box">
            <div class="personal-title">{{ this.$personalType.num === this.personalNum ? 
                this.$personalType.personal : this.personals[this.personalNum - 1].title }}</div>
            <button class="reco-btn" @click="onLinkCody">추천색상 보러가기</button>
            <div class="personal-exp-con">
                <PersonalSub ref="personal_sub"/>
            </div>

        </div>
    </div>
</template>
<script>
import PersonalSub from '@/views/personal/PersonalSub.vue';
import {ref} from "vue";

export default {
    components: {
        PersonalSub
    },
    data() {
        return {
            personalNum: this.$personalType.num
            //스타일 이미지
            ,personals: [
                {
                    id: 1
                    ,src: [
                        require('@/assets/images/personal/봄.png')
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
                        require('@/assets/images/personal/봄.png')
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
                        require('@/assets/images/personal/봄.png')     
                    ]
                    ,title: '사각체형'
                    ,index: 0
                    ,active: ''
                    ,exp: '어깨 허리, 엉덩이 폭이 거의 같은 직선형의 체형입니다. \n현대적인 이미지의 체형입니다.'
                },
                {
                    id: 4
                    ,src: [
                         require('@/assets/images/personal/봄.png')  
                    ]
                    ,title: '둥근체형'
                    ,index: 0
                    ,active: ''
                    ,exp: '등과 팔이 크고 둥글며 가슴과 몸통 허리, 복부, 엉덩이, 다리가 발달되어 \
                    \n신체에 살이 많아 보이는 체형입니다.'
                },
            ]
            ,activePersonal: null
        }
    },
    
    mounted() {
        this.personals.forEach(item => {
            if(item.id == this.personalNum){
                this.personals[item.id-1].active = 'active';
            }
        });
        
        this.$personalType.personal = '고객님의 체형은 ' + this.personals[this.$personalType.num - 1].title + '입니다.';
        this.$refs.personal_sub.changePersonal(this.personalNum);
    },
    methods: {

        button_out(){
            this.personals.forEach(item => {
                item.index = 0;
            });
        },
        button_over(persinal){
            if(this.personals[persinal.id-1].active == 'active') return; 
            this.button_out();
            this.personals[persinal.id-1].index = 1;
        },
        button_click(persinal){
            this.persinalNum = persinal.id
            if(this.personals[persinal.id-1].active == 'active') return;
            this.personals.forEach(item => {
                item.active = '';
            });
            
            this.personals[persinal.id-1].active = 'active';
            this.$refs.persinal_sub.changePersinal(this.persinalNum);
        },
        onLinkCody(){
            console.log('this.$persinalType.num : ' + this.$persinalType.num);
            this.$persinalType.formNum = this.persinalNum;
            this.$router.push({
                name: 'CodyMain',
                query: {formNum : this.persinalNum}
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

</style>
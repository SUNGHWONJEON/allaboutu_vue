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
                        require('@/assets/images/personal/spring.png')
                    ]
                    ,title: '봄 웜톤'
                    ,index: 0
                    ,active: ''
                    ,exp: 
                        '봄 웜톤은 주로 황금빛의 기운을 가지고 있으며, 피부가 화사하고 명랑한 인상을 줍니다!'
                },
                {
                    id: 2
                    ,src: [
                        require('@/assets/images/personal/summer.png')
                    ]
                    ,title: '여름 쿨톤'
                    ,index: 0
                    ,active: ''
                    ,exp: '여름 쿨톤은 주로 시원하고 차가운 인상을 가지고 있으며, 피부톤은 연한 로즈 톤이나 푸른 기운을 가지고 있습니다!'
                },
                {
                    id: 3
                    ,src: [
                        require('@/assets/images/personal/autumn.png')     
                    ]
                    ,title: '가을 웜톤'
                    ,index: 0
                    ,active: ''
                    ,exp: '가을 웜톤은 따뜻하고 노란 기운이 도는 피부톤을 가지고 있습니다! 가을의 물든 자연 풍경과도 잘 어울려요!'
                },
                {
                    id: 4
                    ,src: [
                         require('@/assets/images/personal/winter.png')  
                    ]
                    ,title: '겨울 쿨톤'
                    ,index: 0
                    ,active: ''
                    ,exp: '겨울 쿨톤은 차가운 피부톤을 가지고 있으며 주로 파란빛 기운이 도는 색조를 가지고 있습니다!'
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
        
        this.$personalType.personal = '고객님의 퍼스널컬러는 ' + this.personals[this.$personalType.num - 1].title + '입니다.';
        // this.$refs.personal_sub.changePersonal(this.personalNum);
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
            console.log('this.$personalType.num : ' + this.$personalType.num);
            this.$personalType.formNum = this.persinalNum;
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
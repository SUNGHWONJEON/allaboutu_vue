<template>
<div class="personal-reco" ref="personal_recommand" v-if="this.personalNum != -1">
        <div class="personal-item-con">
            <div class="personal-item-box" v-for="personal in personals" :key="personal.id">
                <div class="personal-item" ref="personal_btn" 
                    :class="{active: personal.active}"
                    v-bind:disabled="personal.active === 'active'"
                    @click="button_click(personal)"  v-if="personalNum === personal.id"
                >
                    <div class="personal-title">{{ personal.title }}</div>
                    <div class="personal-exp">{{ personal.exp }}</div>
                </div>
            </div>
        </div>
        <div class="personal-sub-box">
            <div class="personal-sub-box" v-if="this.recommand">
                <div class="personal-sub-con">
                    <div class="personal-sub-imgbox" v-for="(sub, j) in this.recommand.subList" :key="j">
                        <div class="personal-sub-title">{{ sub.title }}</div>
                        <div class="personal-sub-exp">{{ sub.exp }}</div>
                        <img :src="sub.src">
                    </div>
                </div>
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
    mounted(){
        
        this.recommand= this.personals[this.personalNum - 1]
        console.log("this.recommand : " +this.recommand)
    },
    data() {
        return {
            personalNum: this.$personalType.num,
            recommand: null

            ,personals: [
                {
                    id: 1
                    ,src: [
                        require('@/assets/images/personal/spring.png')
                    ]
                    ,title: 'SPRING WARM'
                    ,index: 0
                    ,active: ''
                    ,exp: 
                        '봄 웜톤은 주로 황금빛의 기운을 가지고 있으며, 피부가 화사하고 명랑한 인상을 줍니다!'
                    ,subList:[
                        {
                            title: 'Coral',
                            src: require('@/assets/images/personal/coral.png'),
                            exp: '봄 웜톤의 화사하고 따뜻한 피부톤에 잘 어울리는 컬러 중 하나입니다!\
                            \n코랄은 주황과 분홍이 조화롭게 섞인 색으로, \
                            \n어떤 봄 웜톤이든 상쾌하고 활기찬 느낌을 부각시켜줘요!!'
                        },
                        {
                            title: 'Light Yellow',
                            src: require('@/assets/images/personal/lightyellow.png'),
                            exp: '밝은 옐로우는 따뜻한 톤의 피부와 아주 잘 어울려요!\
                            \n봄 웜톤의 인상을 더욱 화사하게 만들어주며, \
                            \n자연의 햇빛을 연상케 하는 컬러로 분위기를 밝게 만들어줍니다!'
                        },
                        {
                            title: 'Mint Green',
                            src: require('@/assets/images/personal/mintgreen.png'),
                            exp: '민트 그린은 상큼하고 시원한 느낌을 주어, \
                            \n봄 웜톤의 화사한 이미지를 강조시켜줘요!\
                            \n 특히, 연한 피부톤과의 조합이 아주 매력적입니다!'
                        }
                    ]
                },
                {
                    id: 2
                    ,src: [
                        require('@/assets/images/personal/summer.png')
                    ]
                    ,title: 'SUMMER COOL'
                    ,index: 0
                    ,active: ''
                    ,exp: '여름 쿨톤은 주로 시원하고 차가운 인상을 가지고 있으며, 피부톤은 연한 로즈 톤이나 푸른 기운을 가지고 있습니다!'
                    ,subList:[
                        {
                            title: 'Purple'
                            ,src: require('@/assets/images/personal/purple.png'),
                            exp: '여름 쿨톤은 푸른 기운을 가진 피부톤이 특징적이라, \
                            \n푸르스름한 펄플 컬러가 아주 잘 어울립니다!\
                            \n 연한 라벤더부터 진한 바이올렛까지 다양한 퍼플 톤은 여름 쿨톤의 차가운 느낌을 강조해줘요!'
                        },
                        {
                            title: 'Ice Blue'
                            ,src: require('@/assets/images/personal/iceblue.png'),
                            exp: '시원하면서도 맑은 아이스 블루는 여름 쿨톤에게 어울리는 대표적인 컬러 중 하나입니다!\
                            \n 푸르스름한 톤은 여름 피부와 잘 어우러져 시원한 인상을 부각시켜줘요!'
                        },
                        {
                            title: 'Cool Taupe'
                            ,src: require('@/assets/images/personal/cootaupe.png'),
                            exp: '토크로는 회색과 푸른 기운을 가진 중성적인 컬러로,\
                            \n 여름 쿨톤의 피부톤과 잘 조화됩니다!\
                            \n 차분하면서도 세련된 느낌을 주어 다양한 스타일에 적용하기 좋은 컬러에요!'
                        }
                    ]
                },
                {
                    id: 3
                    ,src: [
                        require('@/assets/images/personal/autumn.png')     
                    ]
                    ,title: 'AUTUMN WARM'
                    ,index: 0
                    ,active: ''
                    ,exp: '가을 웜톤은 따뜻하고 노란 기운이 도는 피부톤을 가지고 있습니다! 가을의 물든 자연 풍경과도 잘 어울려요!'
                    ,subList: [
                        {
                            title: 'Burgundy'
                            ,src:  require('@/assets/images/personal/burgundy.png'),
                            exp: '따뜻하고 톤다운된 붉은색의 대표적인 예로, 가을 웜톤의 피부와 아주 잘 어울려요!\
                            \n 세련된 분위기를 연출하면서도 부드러운 인상을 주는 컬러입니다!'
                        },
                        {
                            title: 'Olive Green'
                            ,src: require('@/assets/images/personal/olivegreen.png'),
                            exp: '올리브 그린은 갈색이 섞인 톤의 그린 컬러로,\
                            \n 가을의 자연적인 색감과 잘 어울립니! 톤다운된 녹색 톤은 가을 웜톤의 피부를 더욱 돋보이게 해줍니다'
                        },
                        {
                            title: 'Charcoal Gray'
                            ,src: require('@/assets/images/personal/charcoalgray.png'),
                            exp: '챠콜 그레이는 어두운 회색 중에서도 따뜻한 톤의 회색으로, \
                            \n가을 웜톤에게 어울리는 대표적인 컬러입니다!\
                            \n 톤다운된 회색은 가을의 분위기를 살려주면서도 고요하고 세련된 느낌을 줍니다!'
                        }
                    ]
                },
                {
                    id: 4
                    ,src: [
                         require('@/assets/images/personal/winter.png')  
                    ]
                    ,title: 'WINTER COOL'
                    ,index: 0
                    ,active: ''
                    ,exp: '겨울 쿨톤은 차가운 피부톤을 가지고 있으며 \n주로 파란빛 기운이 도는 색조를 가지고 있습니다!'
                    ,subList: [
                        {
                            title: 'Royal Blue'
                            ,src: require('@/assets/images/personal/royalblue.png'),
                            exp: '로얄 블루는 깊고 진한 파란색으로, 겨울 쿨톤의 피부톤과 아주 잘 어울립니다!\
                            \n 선명하면서도 고급스러운 느낌을 주는 컬러로, 겨울의 차가운 분위기를 잘 대변합니다!'
                        },
                        {
                            title: 'Puchsia'
                            ,src: require('@/assets/images/personal/puchsia.png'),
                            exp: '푸시아는 밝고 선명한 분홍색으로, 겨울 쿨톤에게 활기와 생기를 불어넣어줍니다!\
                            \n 시원하면서도 세련된 느낌을 연출할 수 있는 컬러 중 하나입니다!'
                        },
                        {
                            title: 'Charcoal Black'
                            ,src: require('@/assets/images/personal/charcoalblack.png'),
                            exp: '차콜 블랙은 깊고 진한 검은색으로, 겨울 쿨톤의 피부와 잘 어울리며 고요하면서도 세련된 분위기를 만들어줍니다\
                            \n 겨울의 시원한 느낌과 잘 어울리는 컬러입니다'
                        }
                    ]
                },
                
            ]
            ,activePersonal: null
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

.personal-item img,
.personal-sub-imgbox img {
    position: absolute;
    width: 200px;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    margin-right: 10px;
    left: calc(50% - 100px);
    bottom: 20px;;
}

.personal-sub-con {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
}

.personal-sub-title {
  font-weight: bold; /* 부제목을 굵게 만듭니다. */
  font-size: 23px;
  line-height: 28px;
  margin-bottom: 15px
}

.personal-sub-exp {
  color: #777; /* 설명 텍스트의 색상을 회색으로 지정합니다. */
  font-size: 18px;
    text-align: left;
}

.personal-sub-imgbox {
    position: relative;
    width: 100%;
    border: 1px solid #e2e2e2;
    padding: 25px;
    min-height: 520px;
}
.personal-exp {
    font-weight: normal;
    font-size: 19px;
    margin-bottom: 20px;
}

.personal-title {
  font-weight: bold;
  font-size: 27px; /* 설명 텍스트의 크기를 조절합니다. */
}
</style>
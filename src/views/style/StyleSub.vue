<template>
    <div class="style-sub-box">
        <div class="style-sub-box" v-for="(recommand, i) in this.recomands[this.styleNum-1]" :key="i">
            <div class="style-sub-con">
                <div class="style-sub-title">
                    {{ recommand.title }}
                </div>
                <div class="style-sub-imgcon" >
                    <div class="style-sub-imgbox" v-for="(src, j) in recommand.src" :key="j">
                        <img :src="obj" v-for="(obj, k) in src" :key="k" :class="src.length == 1 ? 'width100' : ''">
                    </div>
                </div>
                
                <div class="style-sub-exp">
                    {{ recommand.exp }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StyleSub',
    props: {
        name: String,
        styleNum: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            styleNum: -1,
            recomands: [
                //1번 추천
                [
                    {
                        title: '1. 하체 쪽 화려한 옷을 입어 하체로 시선분산!'
                        ,src: [
                            [
                                require('@/assets/images/style/r_1_1_1.png')
                                ,require('@/assets/images/style/r_1_1_2.png')
                            ],
                            [
                                require('@/assets/images/style/r_1_2_1.png')
                                ,require('@/assets/images/style/r_1_2_2.png')
                            ]
                        ],
                        exp: '이렇게 패턴이 들어간 하의를 입거나 화려한 옷을 입어서 상의에 시선이 덜 가도록 해줍니다!!\n\
                            보통 상체가 통통하면 다리가 날씬한 분들이 많으셔서 이쁜 미니스커트를 입으셔도 내 날씬한 다리에 시선분산이 되겠죠?\n\
                            또는 화려한 롱 스커트를 매치해서 코디하는것도 매우 좋은 방법이죠~!'
                    },
                    {
                        title: '2. V넥으로 만들어진 상의 입기'
                        ,src: [
                            [
                                require('@/assets/images/style/r_1_3_1.png')
                                ,require('@/assets/images/style/r_1_3_2.png')
                            ]
                        ],
                        exp: 'V넥 옷을 입으시면 상체로 집중된 시선을 분산시켜드리며 \n\
                            상체가 통통할 경우 이어지는 목 어깨라인이 불룩한 경우도 있을수 있는데요. \n\
                            라운드 넥을입어 도드라지게 보이는 것보다 시원하게 트인걸 입어 체형 \n\
                            보완을 해주는게 좋아요 목의 길이감도 길어보일수 있답니다^^\n\
                            셔츠&난방도 단추를 풀어 목 부분은 답답하게 해주지 않는게 좋아요.'
                    },
                    {
                        title: '3. 다크한 상의로 상의 볼륨감 줄이기'
                        ,src: [
                            [
                                require('@/assets/images/style/r_1_4_1.png')
                                ,require('@/assets/images/style/r_1_4_2.png')
                            ]
                        ],
                        exp: '블랙 코디는 어떤 체형별 코디를 해도 제일 쉽게 코디할수 있으며\n\
                            또한 블랙이라 어디든 코디가 다 가능하다는 점이 장점이에요.\n\
                            어두운 계열의 옷을 입어서 상체의 똥똥한 볼륨을 좀더 낮춰주는 효과가 있어요.'
                    }
                ],
                //2번추천
                [
                    {
                        title: '1. 하이웨스트'
                        ,src: [
                            [
                                require('@/assets/images/style/r_2_2_1.png')
                                ,require('@/assets/images/style/r_2_2_2.png')
                            ]
                        ],
                        exp: '허리가 잘록한 x자형은 하이웨스트가 정말 최고의 라인 강조가 아닐까 생각이 들어요!!\
                            \n루즈 핏의 상의를 같이 매치하면 육감적인 몸매가 돋보여요.'
                    },
                    {
                        title: '2. 몸에 달라붙는 원피스'
                        ,src: [
                            [
                                require('@/assets/images/style/r_2_3_1.png')
                                ,require('@/assets/images/style/r_2_3_2.png')
                            ]
                        ],
                        exp: '모래시계형 몸매는 딱 붙는 원피스를 입을때 정말정말 빛나는 몸매에요.\
                            \n굴곡있는 몸매라인과 잘록한 허리라인의 장점을 잘 드러낼 수 있어요. '
                    },
                    {
                        title: '3. 벨트가 있는 옷이나 원피스&코트'
                        ,src: [
                            [
                                require('@/assets/images/style/r_2_4_1.png')
                            ]
                        ],
                        exp: '벨트가 있는 옷으로 허리라인을 강조하여 몸매를 부각시킬 수 있어요.\
                            \n여기서 주의할 점은 모래시계형은 풍만한 가슴선을 가지고 있어서 \
                            \n상의쪽에 과도한 장식이나 주머니가 있다면 너무 부각될수 있으니 조심하세요. '
                    }
                ],
                //3번추천
                [
                    {
                        title: '1. 러플이나 컬러등 디테일이 달린 셔츠나 탑'
                        ,src: [
                            [
                                require('@/assets/images/style/r_3_1_1.png')
                                ,require('@/assets/images/style/r_3_1_2.png')
                            ]
                        ],
                        exp: '포인트가 있는 셔츠나 탑으로 시선을 분산시켜 일자형 몸매를 각인시키지 않아요.\
                            \n중간 중간 강렬한 포인트가 있으면 좋아요.'
                    },
                    {
                        title: '2. 골반까지 떨어지는 롱 재킷'
                        ,src: [
                            [
                                require('@/assets/images/style/r_3_2_1.png')
                                ,require('@/assets/images/style/r_3_2_2.png')
                            ]
                        ],
                        exp: '길이감이 조금 있는 재킷을 매치하여 스키니진을 코디해준다면 좋아요.\
                            \n또한 미니스커트하고도 매치하면 다리로도 시선이 분산되서 좋아요.'
                    }
                ],
                //4번추천
                [
                    {
                        title: '1. 직선의 세로로 길고 수축색의 코트'
                        ,src: [
                            [
                                require('@/assets/images/style/r_4_1_1.jpg')
                                ,require('@/assets/images/style/r_4_1_2.jpg')
                            ]
                        ],
                        exp: '둥근형의 체형은 살이 많아 둔해 보이는 느낌을 직선이나 각을 이용한 디자인으로 선명한 인상을 주도록 하며 \
                            \n세로로 흐르는 선으로 실고 가늘어 보이는 착시현상을 활용하는게 좋아요.\
                            \n전체적으로 밝은 색보다는 수축색을 사용하고 너무 얇거나 두꺼운 소재는 피하는게 좋아요'
                    },
                    {
                        title: '2. 와이드 팬츠나 슬랙스 코디하기'
                        ,src: [
                            [
                                require('@/assets/images/style/r_5_2_3.png')
                            ]
                        ],
                        exp: '아주 스타일리쉬한 느낌과 편한 착용감으로 계속 꾸준히 사랑 받고있는 아이템이죠.\
                            \n일자로 쭉 오는 이쁜 핏에 적당한 통의 바지는 하체 비만을 잘 가려줘요.'
                    }
                ],
                //5번추천
                [
                    {
                        title: '1. A라인의 스커트&원피스 or 플레어 스커트 코디'
                        ,src: [
                            [
                                require('@/assets/images/style/r_5_1_1.png')
                                ,require('@/assets/images/style/r_5_1_2.png')
                            ]
                        ],
                        exp: '엉덩이가 큰 하체 비만의 경우 밑으로 가면서 점점 퍼지는 스커트를 입어주어서 \
                            \n허벅지나 다리가 부각 되지 않게 해줍니다.'
                    },
                    {
                        title: '2. 와이드 팬츠나 슬랙스 코디하기'
                        ,src: [
                            [
                                require('@/assets/images/style/r_5_2_1.png')
                                ,require('@/assets/images/style/r_5_2_2.png')
                            ]
                        ],
                        exp: '아주 스타일리쉬한 느낌과 편한 착용감으로 계속 꾸준히 사랑 받고있는 아이템이죠.\
                            \n일자로 쭉 오는 이쁜 핏에 적당한 통의 바지는 하체 비만을 잘 가려줘요.'
                    }
                ]
            ]
        }
    }
    ,mounted() {
        console.log('myStyleNum : '+ this.myStyleNum);
    }
    ,methods: {
        changeStyle(num){
            this.styleNum = num;
            console.log('num : ' + num);
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';

</style>
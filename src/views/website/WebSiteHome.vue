<template>
    <div class="title">
        <h2>
            <span style="display: ;">Recommend Sellers</span>
        </h2>
    </div>
    <br>
    <br>
    <br>
    <div>
        <div class="thumbnail-list">
            <div class="thumbnail-box" data-aos="zoom-in" v-for="product in products" :key="product.id">
                <a :href="product.url" class="">  
                    <div class="thumbnail">
                        <img :src="product.image">
                    </div>
                    <div class="description">
                        <strong class="displayTitle">
                            <span>{{ product.name }}</span>
                        </strong>
                        <ul class="description-ul">
                            <li class="displayPrice">
                                <span>{{ product.description }}</span>
                            </li>
                            <li class="displayData">
                                <span>{{ product.price }}</span>
                            </li>
                        </ul>
                    </div>
                </a>
            </div>
            <button @click="goToInsert" class="register-btn">등록</button>
        </div>
    </div>
 </template>

<script>
export default {
  data() {
    return {
      products: [
        // 상품 정보 객체 배열
        {
            image: require('@/assets/images/webSite/hair1.jpg'),
            name: '이지엔',
            description: '이지엔 터치비건 헤어컬러 6종(염색+새치 겸용)',
            price: '11,200원~',
            url: 'https://smartstore.naver.com/eznstyle/category/982bdbe9f73c4bc0914343c904969130?cp=1'
        },
        {
            image: require('@/assets/images/webSite/hair2.jpg'),
            name: '이지엔',
            description: '이지엔 푸딩 염색약 15컬러',
            price: '8,800원',
            url: 'https://smartstore.naver.com/eznstyle/products/8696029711'
        },{
            image: require('@/assets/images/webSite/lip1.jpg'),
            name: '투쿨포스쿨',
            description: '아트클래스 픽싱 블러립',
            price: '9,600원',
            url: 'https://www.toocoolforschool.com/shop/shopdetail.html?branduid=1000002048&xcode=020&mcode=001&scode=&type=Y&sort=sellcnt&cur_code=020&search=&GfDT=bmp0W1w%3D'
        },{
            image: require('@/assets/images/webSite/lip2.jpg'),
            name: '에뛰드',
            description: '에뛰드 픽싱 틴트 4g',
            price: '12,000원',
            url: 'https://www.etude.com/shop/category/lip/%ed%94%bd%ec%8b%b1%ed%8b%b4%ed%8a%b8-4g/'
        }
      ]
    }
  },
  methods: {
    goToInsert() {
        this.$router.push('/website/insert');
    }
  }
}
</script>

<style>
.title h2 span {
    font-size: 40px;
}

.thumbnail-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px;
    
}
.displayTitle {
    color: #ff7b7b;
}
.displayData {
    font-size: 20px;  /* 원하는 크기로 조절하세요 */
    color: #ff7b7b;
}

.myBox-list {
    grid-template-columns: repeat(4,1fr);
        display: grid;
        place-items: center;
        width: 100%;
        grid-row-gap: 3px;
        grid-column-gap: 3px;
}

.register-btn {
    right: 20px;  /* 오른쪽에서 20px 떨어진 곳 */
    bottom: 20px;  /* 아래에서 20px 떨어진 곳 */
    padding: 10px 20px;  /* 패딩 설정 */
    font-size: 20px;  /* 폰트 크기 설정 */
    background-color: #ff7b7b;  /* 배경색 설정 */
    color: white;  /* 글자색 설정 */
    border: none;  /* 테두리 없음 */
    border-radius: 5px;  /* 둥근 모서리 */
}
</style>
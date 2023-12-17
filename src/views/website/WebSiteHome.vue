<template>
  <div class="title">
    <h2>
      <span style="display: ">Recommend Sellers</span>
    </h2>
  </div>
  <br />
  <br />
  <br />
  <div>
    <div class="thumbnail-list">
      <div
        class="thumbnail-box"
        data-aos="zoom-in"
        v-for="product in products"
        :key="product.webNum"
      >
        <a :href="product.webLink" class="">
          <div class="thumbnail">
            <img :src="'/websites/image/' + product.webImg" />
          </div>
          <div class="description">
            <strong class="displayTitle">
              <span>{{ product.brand }}</span>
            </strong>
            <ul class="description-ul">
              <li class="displayPrice">
                <span>{{ product.webTitle }}</span>
              </li>
              <li class="displayData">
                <span>{{ formatPrice(product.price) }}</span>
              </li>
            </ul>
          </div>
        </a>
        <button @click="updateProduct(product.webNum)" class="register-btn" v-if="isAdmin()">
          수정
        </button>
        <button @click="deleteProduct(product.webNum)" class="register-btn" v-if="isAdmin()">
          삭제
        </button>
      </div>
      
    </div>
    <div class="register-button-container">
      <button @click="goToInsert" class="register-btn" v-if="isAdmin()">등록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    isAdmin(){
        const userId = sessionStorage.getItem("userId")
        if(userId != null && userId.includes('admin')){
            return true
        }
        else {
            return false
        }
    },
    formatPrice(price) {
      if (!price) return "";
      return Number(price).toLocaleString() + "원"; // toLocaleString 메서드를 이용해 천 단위마다 쉼표를 추가하고, '원'을 붙입니다.
    },
    updateProduct(webNum) {
      console.log("updateProduct" + webNum);
      this.$router.push("/website/insert/" + webNum);
    },
    deleteProduct(webNum) {
      this.$axios
        .delete("/websites/" + webNum)
        .then((response) => {
          alert("삭제되었습니다.");
          this.$router.go(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goToInsert() {
      this.$router.push("/website/insert");
    },
    getProductList() {
      this.$axios
        .get("/websites")
        .then((response) => {
          this.products = response.data.content;
          console.log(response.data);
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
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
  font-size: 20px; /* 원하는 크기로 조절하세요 */
  color: #ff7b7b;
}

.myBox-list {
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  place-items: center;
  width: 100%;
  grid-row-gap: 3px;
  grid-column-gap: 3px;
}

.register-btn {
  right: 20px; /* 오른쪽에서 20px 떨어진 곳 */
  bottom: 20px; /* 아래에서 20px 떨어진 곳 */
  padding: 10px 20px; /* 패딩 설정 */
  font-size: 20px; /* 폰트 크기 설정 */
  background-color: #ff7b7b; /* 배경색 설정 */
  color: white; /* 글자색 설정 */
  border: none; /* 테두리 없음 */
  border-radius: 5px; /* 둥근 모서리 */
  margin: 5px;
}

.register-button-container {
  bottom: 0;
  right: 50px;
  padding: 20px;
}

.thumbnail {
  height: 200px;
}
.description {
  height: 120px;
}

.displayPrice {
  height: 50px;
}
</style>
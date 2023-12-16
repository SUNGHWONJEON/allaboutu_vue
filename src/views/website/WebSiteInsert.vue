<!-- <template>
    <div>
      <table>
        <thead>
          <tr>
            <th>웹번호</th>
            <th>이미지</th>
            <th>브랜드</th>
            <th>타이틀</th>
            <th>가격</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.id }}</td>
            <td><img :src="product.image" alt="product image"></td>
            <td>{{ product.brand }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="edit(index)">수정</button>
              <button @click="remove(index)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button @click="prevPage">이전 페이지</button>
        <button @click="nextPage">다음 페이지</button>
      </div>
    </div>
  </template> -->
  
  <template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>제품등록</h1>
      <div class="signupForm">
        <div>
          <label for="brand">브랜드</label>
          <input
            type="text"
            id="brand"
            placeholder="브랜드명을 입력해주세요."
            v-model="brand"
            @blur="checkDupId"
          />
        </div>
        <div>
          <label for="title">타이틀</label>
          <input
            type="text"
            id="title"
            placeholder="타이틀을 입력해주세요."
            v-model="webTitle"
          />
        </div>
        <div>
          <label for="price">가격</label>
          <input
            type="text"
            id="price"
            placeholder="가격을 입력해주세요."
            v-model="price"
          />
        </div>
        <div>
          <label for="link">링크</label>
          <input
            type="text"
            id="link"
            placeholder="링크를 등록해주세요."
            v-model="webLink"
          />
        </div>
        <div>
          <label for="file_input">이미지</label>
          <input
            type="file"
            name="file_input"
            id="file_input"
            @change="getFileName($event.target.files)"
          />
        </div>
      </div>
      <button type="submit" @click="postWeb" v-if="webNum == ''">등록</button>
      <button type="submit" @click="updateWeb" v-else>수정</button>
    </form>
  </div>
</template>

  <script>
export default {
  name: "WebSiteInsert",
  data() {
    return {
      products: [], // 제품 정보 배열
      page: 1, // 현재 페이지
      file: "",
      webNum: "",
      brand: "",
      webTitle: "",
      price: "",
      webLink: "",
      webImg: "",
    };
  },
  created() {
    console.log("created" + this.$route.params.webNum);
    if (this.$route.params.webNum) {
      this.webNum = this.$route.params.webNum;
      this.getWebsite(this.webNum);
    }

    this.loginUserId = sessionStorage.getItem("userId");
  },
  methods: {
    updateWeb() {
      const sendData = new FormData();
      const website = {
        brand: this.brand,
        webTitle: this.webTitle,
        price: this.price,
        webLink: this.webLink,
      };

      console.log(JSON.stringify(website));
      sendData.append(
        "website",
        new Blob([JSON.stringify(website)], { type: "application/json" })
      );
      sendData.append("file", this.file);

      this.$axios
        .patch("/websites/" + this.webNum, sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("제품이 수정되었습니다.");
          this.$router.push("/website");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWebsite() {
      this.$axios
        .get("/websites/" + this.webNum)
        .then((response) => {
          console.log("getWebsite" + response.data);
          const website = response.data;
          this.brand = website.brand;
          this.webTitle = website.webTitle;
          this.price = website.price;
          this.webLink = website.webLink;
          this.webImg = website.webImg;
          if (this.webImg != null) {
            this.$axios
              .get("/websites/image/" + this.webImg, {
                responseType: "arraybuffer",
              })
              .then((res) => {
                const blob = new Blob([res.data]);
                const contentType = res.headers["content-type"];
                let file = new File(
                  [blob],
                  this.webImg,
                  { type: contentType, lastModified: new Date().getTime() },
                  "utf-8"
                );
                this.file = file;
                console.log(file);

                let container = new DataTransfer();
                container.items.add(file);
                document.querySelector("#file_input").files = container.files;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postWeb() {
      const sendData = new FormData();
      const website = {
        brand: this.brand,
        webTitle: this.webTitle,
        price: this.price,
        webLink: this.webLink,
      };

      console.log(JSON.stringify(website));
      sendData.append(
        "website",
        new Blob([JSON.stringify(website)], { type: "application/json" })
      );
      sendData.append("file", this.file);
      this.$axios
        .post("/websites", sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("제품이 등록되었습니다.");
          this.$router.push("/website");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFileName(files) {
      if (files) {
        this.file = files[0];
      }
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  max-width: 400px;
}

.signupForm {
  display: flex;
  flex-direction: column;
}

form {
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin: 0px 0px 0px 50px;
  font-weight: bold;
}

input,
select {
  appearance: auto;
  width: 300px;
  padding: 10px;
  margin: 0px 0px 8px 50px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #eb43b0;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 300px;
  margin: 20px 0 30px 50px;
}

button:hover {
  background-color: #ee7bc5;
}

#gender,
#birth {
  color: gray;
}

#gender:valid,
#birth:valid {
  color: black;
}
</style>

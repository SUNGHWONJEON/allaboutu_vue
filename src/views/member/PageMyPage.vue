<template>
  <br>
  <div
    id="outer"
    style="width: 600px; margin: 100px auto"
    cellspacing="5"
    cellpadding="0"
  >
    <div class="row align-items-center">
      <div class="update-block">
        <div id="myPageTitle" class="contents-boxes">MY PAGE</div>
        <table>
          <tr>
            <th class="h5-custom td-200">아이디</th>
            <td>{{ myPage.userId }}</td>
          </tr>
          <tr>
            <th class="h5-custom td-200">email</th>
            <td>{{ myPage.userEmail }}</td>
          </tr>
          <tr>
            <th class="h5-custom td-200">이름</th>
            <td>{{ myPage.userName }}</td>
          </tr>
          <tr>
            <th class="h5-custom td-200">전화번호</th>
            <td>
              <input
                type="text"
                v-model="userPhone"
                style="width: 100%; text-align: center"
              />
            </td>
          </tr>
          <tr>
            <th class="td-200">PASSWORD</th>
            <td>
              <input
                type="password"
                class="form-control joinInput mt-2"
                v-model="originPwd"
                placeholder="현재 비밀번호"
                style="width: 100%"
              />
            </td>
          </tr>
          <tr>
            <th class="td-200">NEW PASSWORD</th>
            <td>
              <input
                type="password"
                class="form-control joinUnpyt mt-2"
                v-model="newPwd"
                placeholder="새로운 비밀번호"
                style="width: 100%"
              />
            </td>
          </tr>
          <tr>
            <th class="td-200">PASSWORD AGAIN</th>
            <td>
              <input
                type="password"
                class="'form-control joinInput mt-2"
                v-model="newPwd2"
                placeholder="한 번 더 입력"
                style="width: 100%"
              />
            </td>
          </tr>
        </table>

        <input
          type="button"
          @click="updateMypage"
          class="btn btn-primary btn-default btn-sm mt-2 my-custom-button"
          value="회원정보 수정"
        />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<style scoped>
#myPageTitle {
  color: black;
  font-family: Poppins-Bold;
  font-size: 28px;
  margin: 10px;
  text-align: center;
}

.my-custom-button {
  background-color: #f0f0f0;
  border: 2px solid #ad578c;
  padding: 8px 16px;
  /* 추가적인 스타일 속성 정의 */
}

.h5-custom {
  text-align: center;
  font-size: 20px;
  color: black; /* 글자색을 검정색으로 변경 */
}

.td-200 {
  width: 200px;
}

.update-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script>
export default {
  name: "PageMyPage",
  data() {
    return {
      myPage: {},
    };
  },
  mounted() {
    this.getMyPage();
  },
  methods: {
    updateMypage() {
      const userId = sessionStorage.getItem("userId"); // 사용자 번호를 가져오는 방법에 따라 구현
      const sendDate = {
        userPhone: this.userPhone,
        userPwd: this.newPwd,
      };
      this.$axios
        .patch(`/myPage/${userId}`, sendDate)
        .then((response) => {
          this.myPage = response.data;
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getMyPage() {
      const userId = sessionStorage.getItem("userId"); // 사용자 번호를 가져오는 방법에 따라 구현
      this.$axios
        .get(`/myPage/${userId}`)
        .then((res) => {
          this.userPhone = res.data.userPhone;
          this.myPage = res.data;
          console.log(this.myPage);
          console.log(typeof this.myPage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

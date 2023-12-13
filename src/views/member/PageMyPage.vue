<template>
    <table id="outer" style="width:700px; margin:0 auto;" cellspacing="5" cellpadding="0">
        <tr class="MyPage">
            <td class="container-fluid">
                <div class="row align-items-center">
                    <div class="col">
                    </div>
                    <div class="col">
                        <div id="logo3" class="contents-boxes">마이페이지</div>
                        <h5 class='h5-custom'>아이디</h5>
                        <div>{{ myPage.userId }}</div>
                        <h5 class="h5-custom">email</h5>
                        <div>{{ myPage.userEmail }}</div>
                        <h5 class="h5-custom">이름</h5>
                        <div>{{ myPage.userName }}</div>
                        <h5 class="h5-custom">전화번호</h5>
                        <input type="text" v-model="userPhone" style="width: 100px;">
                        <h5 class="h5-custom">비밀번호 변경</h5>
                        <div>현재 비밀번호를 입력해주세요.</div>
                        <input type="password" class="form-control joinInput mt-2" v-model="originPwd" placeholder="현재 비밀번호" style="width: 200px;" align="center">
                        <div>새로 사용하실 비밀번호를 입력해주세요.</div>
                        <input type="password" class="form-control joinUnpyt mt-2" v-model="newPwd" placeholder="새로운 비밀번호" style="width: 200px;" align="center">
                        <div>한 번 더 입력해주세요.</div>
                        <input type="password" class="'form-control joinInput mt-2" v-model="newPwd2" placeholder="한 번 더 입력" style="width: 200px;" align="center"><br>
                        <input type="button" @click="updateMypage" class="btn btn-primary btn-default btn-sm mt-2 my-custom-button" value="회원정보 수정">
 
                    </div>
                    <div class="col">
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<style>
#logo3 {
  color: pink;
  font: italic 4em "Fira Sans", serif;
  margin: 10px;
}

.my-custom-button {
  background-color: #f0f0f0;
  border: 2px solid #ad578c;
  padding: 8px 16px;
  /* 추가적인 스타일 속성 정의 */
}

.h5-custom {
  font-size: 20px;
  color: black;  /* 글자색을 검정색으로 변경 */
  border: 2px solid #ad578c;  /* 테두리 색을 빨간색으로 변경 */
  padding: 5px;
}
</style>

<script>
import axios from 'axios';
import router from '@/router';

export default {
  name: 'myPage',
  data() {
    return {
      myPage: {}
    };
  },
  mounted() {
    this.getMyPage()
  },
  methods: {
    updateMypage() {
      const userId = sessionStorage.getItem("userId"); // 사용자 번호를 가져오는 방법에 따라 구현
      const sendDate = {
        userPhone: this.userPhone,
        userPwd: this.newPwd
      }
      this.$axios.patch(`/myPage/${userId}`, sendDate)
        .then(response => {
          this.myPage = response.data;
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
        });
    },
    getMyPage() {
      const userId = sessionStorage.getItem("userId"); // 사용자 번호를 가져오는 방법에 따라 구현
      this.$axios.get(`/myPage/${userId}`)
        .then((res) => {
          this.userPhone = res.data.userPhone;
          this.myPage = res.data;
          console.log(this.myPage);
          console.log(typeof(this.myPage));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>

<template>
    <table id="outer" align="center" width="700" celspacing="5" cellpadding="0">
        <tr class="MyPage">
            <td class="container-fluid">
                <div class="row align-items-center">
                    <div class="col">
                    </div>
                    <div class="col">
                        <div id="logo3" class="contents-boxes">마이페이지</div>
                        <h5 class='mt-4'>아이디</h5>
                        <div>{{ myPage.userId }}</div>
                        <h5 class="mt-4">email</h5>
                        <div>{{ myPage.userEmail }}</div>
                        <h5 class="mt-4">이름</h5>
                        <div>{{ myPage.userName }}</div>
                        <h5 class="mt-4">전화번호</h5>
                        <div>{{ myPage.userPhone }}</div>
                        <input type="button" @click="openPhone" class="btn btn-primary btn-default btn-sm mt-3" value="전화번호 변경하기">
                        <h5 class="mt-4">비밀번호 변경</h5>
                        <div>현재 비밀번호를 입력해주세요.</div>
                        <input type="password" class="form-control joinInput mt-2" id="originPwd" placeholder="현재 비밀번호" style="width: 200px;" align="center">
                        <div>새로 사용하실 비밀번호를 입력해주세요.</div>
                        <input type="password" class="form-control joinUnpyt mt-2" id="pwd" placeholder="새로운 비밀번호" style="width: 200px;" align="center">
                        <div>한 번 더 입력해주세요.</div>
                        <input type="password" class="'form-control joinInput mt-2" id="pwd2" placeholder="한 번 더 입력" style="width: 200px;" align="center"><br>
                        <input type="button" @click="updatePwd" class="btn btn-primary btn-default btn-sm mt-2 my-custom-button" value="비밀번호 수정">
 
                    </div>
                    <div class="col">
                    </div>
                </div>
            </td>
        </tr>
    </table>
</template>

<style>
#logo3{color: pink;font: italic 4em "Fira Sans", serif; margin: 10px;}
.my-custom-button {
    background-color: #f0f0f0;
    border: 2px solid #ad578c;
    padding: 8px 16px;
    /* 추가적인 스타일 속성 정의 */
}
</style>

<script>
import axios from 'axios';

export default {
  name: 'myPage',
  data() {
    return {
      myPage: {}
    };
  },
  mounted() {
    console.log('session = ', sessionStorage)
  },
  methods: {
    updateMypage() {
      const userNum = updateUser; // 사용자 번호를 가져오는 방법에 따라 구현
      this.$axios.patch(`/myPage/${userNum}`)
        .then(response => {
          this.myPage = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getMyPage() {
      const userNum = getMyPage; // 사용자 번호를 가져오는 방법에 따라 구현
      this.$axios.get(`/myPage/${userNum}`)
        .then((res) => {
          this.myPage = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>

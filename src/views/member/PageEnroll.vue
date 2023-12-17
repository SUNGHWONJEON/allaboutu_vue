<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>회원가입</h1>
      <div class="signupForm">
        <div>
          <label for="id">아이디</label>
          <input type="text" id="id" placeholder="아이디를 입력해주세요." v-model="userId" />
          <!-- <span class="checkDupId" v-if="!isDupId">이미 사용중인 아이디입니다.</span> -->
        </div>
        <div>
          <label for="name">이름</label>
          <input type="text" id="name" placeholder="이름을 입력해주세요." v-model="userName" />
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해주세요." v-model="userPwd" />
        </div>
        <div>
          <label for="passwordConfirm">비밀번호 확인</label>
          <input type="password" id="passwordConfirm" placeholder="비밀번호를 다시 입력해주세요." v-model="passwordConfirm" />
        </div>
        <div>
          <label for="email">이메일</label>
          <input type="text" id="email" placeholder="이메일을 입력해주세요." v-model="userEmail" />
        </div>
        <div>
          <label for="gender">성별</label>
          <select id="gender" v-model="userGender" required>
            <option value="" disabled selected>성별을 선택해주세요.</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>
        <div>
          <label for="birth">생년월일</label>
          <input type="date" id="birth" v-model="userBirth" />
        </div>
        <div>
          <label for="phone">연락처</label>
          <input type="text" id="phone" placeholder="연락처를 입력해주세요." v-model="userPhone" />
        </div>
      </div>
      <button type="submit">
        회원가입
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
      userName: '',
      userPwd: '',
      passwordConfirm: '',
      userEmail: '',
      userGender: '',
      userBirth: '',
      userPhone: '',
    };
  },
  methods: {
    /* 사용자 아이디 중복 검사 */
    async checkDupId() {
      this.isDupId = true;
      // console.log("checkDupId 실행됨");

      const response = await this.checkDupId(this.userId);
      if (!response.data) {
        this.isDupId = false;
      } else {
        this.isDupId = true;
      }
    },

    /* 회원가입 폼 유효성 검사 */
    submitForm() {

      /* 사용자 아이디 유효성 검사 */
      if (this.userId.toLowerCase().includes('admin')) {
        alert('"admin"을 포함한 아이디는 허용되지 않습니다.');
        return;
      } else if (this.userId === '') {
          alert('아이디를 입력해주세요.');
          return;
      }

      /* 사용자 아이디 중복일 때 검사 */

      /* 사용자 이름 유효성 검사 */
      if (this.userName.length <= 2 || this.userName.length >= 4) {
        alert('이름은 2글자 이상, 4자리 이하로 입력해주세요.');
        return;
      } else if (this.userName.includes('관리자')) {
          alert('"관리자"를 포함한 이름은 허용되지 않습니다.');
          return;
      } else if (this.userName === '') {
          alert('이름을 입력해주세요.');
          return;
      }
      
      /* 비밀번호 유효성 검사 */
      if (this.userPwd !== this.passwordConfirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      } else if (!this.userPwd.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/)) {
          alert('비밀번호는 8~16자의 길이로 영문 대소문자, 숫자, 특수문자가 각각 1개 이상 포함되어야 합니다.');
          return;
      } else if (this.userPwd === '') {
          alert('비밀번호를 입력해주세요.');
          return;
      }

      /* 이메일 유효성 검사 */
      if (!this.userEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
        alert('이메일 형식이 올바르지 않습니다.');
        return;
      } else if (this.userEmail === '') {
          alert('이메일을 입력해주세요.');
          return;
      }

      /* 생년월일 유효성 검사 */
      if (new Date(this.userBirth) >= new Date() || new Date(this.userBirth) <= new Date('1920-01-01')) {
        alert('생년월일을 다시 확인해주세요.');
        return;
      }

      /* 연락처 유효성 검사 */
      if (!this.userPhone.match(/^\d{3}-\d{3,4}-\d{4}$/)) {
        alert('연락처 형식이 올바르지 않습니다.');
        return;
      } else if (this.userPhone === '') {
          alert('연락처를 입력해주세요.');
          return;
      }

      /* 설정한 유효성 검사를 모두 통과할 시 회원가입 요청 */
      this.signUpSubmit();
    },

    signUpSubmit() {
      console.log("signUpSubmit 실행됨");

      let saveData = {
        userId: this.userId,
        userName: this.userName,
        userPwd: this.userPwd,
        userEmail: this.userEmail,
        userGender: this.userGender,
        userBirth: this.userBirth + "T00:00:00",
        userPhone: this.userPhone,
      };
      console.log(saveData);

      try {
        this.$axios
          .post("/signup", JSON.stringify(saveData), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((response) => {
            console.log(response);
            if (response.data.errorCode === 400) {
              alert(response.data.errorMessage);
            } else {
              alert("회원가입이 완료되었습니다. 로그인 화면으로 돌아갑니다");
              this.$router.push({ path: "/login" });
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        console.error(error);
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

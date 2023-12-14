<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>회원가입</h1>
      <div class="signupForm">
        <div>
          <label for="id">아이디</label>
          <input type="text" id="id" placeholder="아이디를 입력해주세요." v-model="userId" />
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
          <input type="password" id="passwordConfirm" placeholder="비밀번호를 입력해주세요." v-model="passwordConfirm" />
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
    submitForm() {
      // 사용자 이름이 "admin"을 포함하는지 검사
      if (this.userId.toLowerCase().includes('admin')) {
        alert('"admin"을 포함한 사용자 이름은 허용되지 않습니다.');
        return; // 회원가입 로직을 진행하지 않음
      }

      // 회원가입 로직을 계속 진행
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

<template>
	<div class="container">
		<form @submit.prevent="submitForm">
            <h1>회원가입</h1>
			<div>
				<label for="id">아이디</label>
				<input type="text" id="id" v-model="userId" />
			</div>
			<div>
				<label for="name">이름</label>
				<input type="text" id="name" v-model="userName" />
			</div>
			<div>
				<label for="password">비밀번호</label>
				<input type="password" id="password" v-model="userPwd" />
			</div>
			<div>
				<label for="passwordConfirm">비밀번호 확인</label>
				<input type="password" id="passwordConfirm" v-model="passwordConfirm" />
			</div>
			<div>
				<label for="email">이메일</label>
				<input type="text" id="email" v-model="userEmail" />
			</div>
			<div>
				<label for="gender">성별</label>
				<input type="text" id="gender" v-model="userGender" />
			</div>
            <div>
				<label for="birth">생년월일</label>
				<input type="Date" id="birth" v-model="userBirth" />
			</div>
            <div>
				<label for="phone">연락처</label>
				<input type="text" id="phone" v-model="userPhone" />
			</div>
			<button type="submit">회원가입</button>
		</form>
	</div>
</template>

<script>
export default {
    data: () => ({
        userId : "",
        idRules: [
          v => !!v || '아이디를 작성해주세요',
          v => (v && v.length <= 15) || '아이디는 15글자를 넘을 수 없습니다.',
      ],
        userName : "",
        idRules: [
          v => !!v || '아이디를 작성해주세요',
          v => (v && v.length <= 15) || '아이디는 15글자를 넘을 수 없습니다.',
      ],
        userEmail : "",
        emailRules: [
          v => !!v || '이메일을 작성해주세요',
          v => /.+@.+\..+/.test(v) || '이메일 형식으로 작성해주세요',
      ],
        userPwd : "",
        passwordRules: [
          v => !!v || '비밀번호를 작성해주세요',
          v => (v && v.length >= 5) || '비밀번호는 5글자 이상 작성해주세요',
          v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
          v => /([!@$%])/.test(v) || '특수문자를 포함해야합니다 [!@#$%]'
      ],
        passwordConfirm : "",
        passwordConfirmRules: [
          v => !!v || '비밀번호를 작성해주세요',
          v => (v && v.length >= 5) || '비밀번호는 5글자 이상 작성해주세요',
          v => /(?=.*\d)/.test(v) || '숫자를 포함해야합니다',
          v => /([!@$%])/.test(v) || '특수문자를 포함해야합니다 [!@#$%]',

        ],
        nickname : "",
        nameRules: [
          v => !!v || '닉네임을 작성해주세요',
          v => (v && v.length <= 10) || '닉네임을 10글자를 넘을 수 없습니다.',
      ],
    }),
    computed:{
      passwordConfirmationRule() {
      return () =>
        this.password !== this.passwordConfirm || "패스워드가 일치하지 않습니다";
    }
    },
    methods: {
        signUpSubmit(){
          const validate = this.$refs.form.validate()
          if(validate){
          let saveData = {};
          saveData.userId = this.userId;
          saveData.userName = this.userName;
          saveData.userPwd = this.userPwd;
          saveData.userEmail = this.userEmail;
          saveData.userGender = this.userGender;
          saveData.userBirth = this.userBirth;
          saveData.userPhone = this.userPhone;

          try {
             this.$axios.post("/api/member", JSON.stringify(saveData), {
               headers: {
                 "Content-Type": `application/json`,
                  },
                  })
                  .then((response) => {
                    console.log(response)
                    if (response.data.errorCode === 400) {
                      alert(response.data.errorMessage)

                      }
                      else{
                        alert("회원가입이 완료되었습니다. 로그인 화면으로 돌아갑니다")
                        this.$router.push({path: './login'});
                      }
                      })
            .catch(error =>{
              console.log(error.response);

            });
      } catch (error) {
        console.error(error);
      }
        }},
        linkToLogin(){
          this.$router.push({path:"./login"});
        }
    }
}
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  width: 300px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>
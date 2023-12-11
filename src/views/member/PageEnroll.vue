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
                    <input type="Date" id="birth" v-model="userBirth" />
                </div>

                <div>
                    <label for="phone">연락처</label>
                    <input type="text" id="phone" placeholder="연락처를 입력해주세요." v-model="userPhone" />
                </div>

            </div>

            <button type="submit" @click="signUpSubmit" @submit="signUpSubmit">
                회원가입
            </button>

        </form>

    </div>

</template>

<script>
export default {
  data() {
    return {
      userGender: '',
      userBirth: ''
    };
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
    width: 300px;
    padding: 10px;
    margin: 0px 0px 8px 50px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    background-color: #ee7bc5;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 300px;
    margin: 20px 0 30px 50px;
}

button:hover {
    background-color: #eb43b0;
}

#gender,
#birth {
    color: gray; /* 기본 텍스트의 글자색을 회색으로 설정 */
}

#gender:valid,
#birth:valid {
    color: black; /* 값이 있는 경우 텍스트의 글자색을 검정색으로 설정 */
}
</style>
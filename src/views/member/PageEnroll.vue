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
    data: () => ({
        userId: "",
        idRules: [
            (v) => !!v || "아이디를 작성해주세요",
            (v) =>
                (v && v.length <= 15) || "아이디는 15글자를 넘을 수 없습니다.",
        ],
        userName: "",
        idRules: [
            (v) => !!v || "이름을 작성해주세요",
            (v) =>
                (v && v.length <= 4) || "이름은 4글자를 넘을 수 없습니다.",
        ],
        userEmail: "",
        emailRules: [
            (v) => !!v || "이메일을 작성해주세요",
            (v) => /.+@.+\..+/.test(v) || "이메일 형식으로 작성해주세요",
        ],
        userPwd: "",
        passwordRules: [
            (v) => !!v || "비밀번호를 작성해주세요",
            (v) => (v && v.length >= 5) || "비밀번호는 5글자 이상 작성해주세요",
            (v) => /(?=.*\d)/.test(v) || "숫자를 포함해야합니다",
            (v) => /([!@$%])/.test(v) || "특수문자를 포함해야합니다 [!@#$%]",
        ],
        passwordConfirm: "",
        passwordConfirmRules: [
            (v) => !!v || "비밀번호를 작성해주세요",
            (v) => (v && v.length >= 5) || "비밀번호는 5글자 이상 작성해주세요",
            (v) => /(?=.*\d)/.test(v) || "숫자를 포함해야합니다",
            (v) => /([!@$%])/.test(v) || "특수문자를 포함해야합니다 [!@#$%]",
        ],
    }),
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.password !== this.passwordConfirm ||
                "패스워드가 일치하지 않습니다";
        },
    },
    methods: {
        signUpSubmit() {
            console.log("signUpSubmit 실행됨");

            let saveData = {};
            saveData.userId = this.userId;
            saveData.userName = this.userName;
            saveData.userPwd = this.userPwd;
            saveData.userEmail = this.userEmail;
            saveData.userGender = this.userGender;
            saveData.userBirth = this.userBirth + "T00:00:00";
            saveData.userPhone = this.userPhone;
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
                            alert(
                                "회원가입이 완료되었습니다. 로그인 화면으로 돌아갑니다"
                            );
                            this.$router.push({ path: "/login" });
                        }
                    })
                    .catch((error) => {
                        console.log(error.response);
                    });
            } catch (error) {
                console.error(error);
            }

            // const validate = this.$refs.form.validate();
            // if (validate) {
            //     let saveData = {};
            //     saveData.userId = this.userId;
            //     saveData.userName = this.userName;
            //     saveData.userPwd = this.userPwd;
            //     saveData.userEmail = this.userEmail;
            //     saveData.userGender = this.userGender;
            //     saveData.userBirth = this.userBirth;
            //     saveData.userPhone = this.userPhone;
            //     console.log(saveData);

            //     try {
            //         this.$axios
            //             .post("/signup", JSON.stringify(saveData), {
            //                 headers: {
            //                     "Content-Type": `application/json`,
            //                 },
            //             })
            //             .then((response) => {
            //                 console.log(response);
            //                 if (response.data.errorCode === 400) {
            //                     alert(response.data.errorMessage);
            //                 } else {
            //                     alert(
            //                         "회원가입이 완료되었습니다. 로그인 화면으로 돌아갑니다"
            //                     );
            //                     this.$router.push({ path: "./login" });
            //                 }
            //             })
            //             .catch((error) => {
            //                 console.log(error.response);
            //             });
            //     } catch (error) {
            //         console.error(error);
            //     }
            // }
        },
        linkToLogin() {
            this.$router.push({ path: "/login" });
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
    color: gray; /* 기본 텍스트의 글자색을 회색으로 설정 */
}

#gender:valid,
#birth:valid {
    color: black; /* 값이 있는 경우 텍스트의 글자색을 검정색으로 설정 */
}
</style>
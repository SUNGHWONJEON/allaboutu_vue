<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <!-- 로그인 박스 띄우는 영역 -->
                <div class="container mx-auto p-6">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <h1 class="title">All About U</h1>
                        <form @submit.prevent="fnLogin">
                            <div class="login-part">
                                <div class="id-storage">
                                    <div class="flex justify-between items-center">
                                        <label class="flex items-center">
                                            <input type="checkbox" class="form-checkbox" v-model="rememberMe"/>
                                            <span class="ml-2">아이디 저장</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="id">
                                    <input type="text" v-model="userId" placeholder="아이디" class="email-id" />
                                </div>
                                <div class="pwd">
                                    <input type="password" v-model="userPwd" placeholder="비밀번호" class="pw" />
                                </div>
                                <div class="mb-4">
                                    <button type="submit" class="login">로그인</button>
                                </div>
                            </div>
                            <div class="id_pwd_enroll">
                                <a href="#" class="link-separator">아이디 찾기 | </a>
                                <a href="#" class="link-separator">비밀번호 찾기 | </a>
                                <router-link to="/enroll" class="">회원가입</router-link>
                            </div>
                            <hr content="SNS로 3초 로그인" class="SNS" />
                            <div class="mb-4">
                                <div class="social-button mb-2">
                                    <a href="https://kauth.kakao.com/oauth/authorize?client_id=b2f72c2fd16ce9a5b5ee4b0c3c6b28e2&redirect_uri=http://localhost:1111/login&response_type=code">
                                        <img src="@/assets/images/KakaoLoginCircle.png" />
                                    </a>
                                    
                                    <a href=""><img src="@/assets/images/NaverLoginCircle.png" /></a>
                                    
                                    <a href=""><img src="@/assets/images/GoogleLoginCircle.png" /></a>
                                    
                                    <a href=""><img src="@/assets/images/FaceLoginCircle.png" /></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: "",
            userPwd: "",
            rememberMe: false,
        };
    },
    methods: {
        async fnLogin() {
            // API 서버로 POST 요청으로 로그인 요청 보내기
            this.$axios
                .post("/auth/login", {
                    userId: this.userId,
                    userPwd: this.userPwd,
                })
                .then((res) => {
                    console.log(res);
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    this.$axios.defaults.headers.common["x-access-token"] =
                        res.data.accessToken;

                    // 토큰 저장
                    // const token = response.data.token;
                    // localStorage.setItem("token", token);

                    // 로그인 성공 시 페이지 이동
                    this.changePage();
                })
                .catch((err) => {
                    console.error("로그인 실패:", err);
                });
        },
        changePage() {
            // 페이지 이동
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style scoped>
.flex {
    display: flex;
}
.justify-between {
    justify-content: space-between;
}
.items-center {
    align-items: center;
}
.title {
    color: #ee7bc5;
    margin: 0px 0px 30px 0px;
}
.id-storage {
    margin: 0px 100px 0px 325px;
    display: flex;
    justify-content: flex-start;
}
.email-id {
    margin: 5px 0px 5px 0px;
    width: 250px;
    height: 34px;
}
.pw {
    margin: 5px 0px 10px 0px;
    width: 250px;
    height: 34px;
}
.social-button {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
}
.social-button a img {
    border-style: none;
    width: 50px;
    margin: 10px 10px;
}
.id_pwd_enroll {
    margin: 20px 0px 20px 0px;
}
.SNS {
    border: none; /* 각 경계 속성 제거 */
    border-top: 1px solid rgb(234, 234, 234);
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    position: relative;
}
hr {
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    width: 350px;
}
.SNS::after {
    background: rgb(255, 255, 255);
    content: "SNS로 3초 로그인";
    padding: 0px 20px;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    color: gray;
}
.login {
    width: 250px;
    height: 40px;
    border: none;
    background: rgb(251, 33, 117);
    background: linear-gradient(
        0deg,
        rgba(251, 33, 117, 1) 0%,
        rgba(234, 76, 137, 1) 100%
    );
    color: #fff;
    overflow: hidden;
}
.login:hover {
    text-decoration: none;
    color: #fff;
}
.login:before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
}
.login:hover {
    opacity: 0.7;
}
.login:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
        -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}
.id input,
.pwd input {
    text-align: left;
    border: 2px solid #000;
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
}
.id input::placeholder,
.pwd input::placeholder {
    text-align: center;
}
</style>
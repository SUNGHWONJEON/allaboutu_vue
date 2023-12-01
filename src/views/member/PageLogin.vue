<template>
    <div class="main-wrapper">
        <div class="main-containers">
            <div class="contents-boxes">
                <!-- 로그인 박스 띄우는 영역 -->
                <div class="container mx-auto p-6">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <h1 class="title">All About U</h1>
                        <form @submit.prevent="fnLogin">
                            <div class="id-storage">
                                <div class="flex justify-between items-center">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox" v-model="rememberMe">
                                        <span class="ml-2">아이디 저장</span>
                                    </label>
                                </div>
                            </div>
                            <div class="id">
                                <input type="text" v-model="user_id" placeholder="아이디" class="email-id">
                            </div>
                            <div class="pwd">
                                <input type="password" v-model="user_pw" placeholder="비밀번호" class="pw">
                            </div>
                            <div class="mb-4">
                                <button type="submit" class="login">로그인</button>
                            </div>
                            <div class="id_pwd_enroll">
                                <a href="#" class="link-separator">아이디 찾기  |  </a>
                                <a href="#" class="link-separator">비밀번호 찾기  |  </a>
                                <router-link to="/enroll" class="">회원가입</router-link>
                            </div>
                            <hr content="SNS로 3초 로그인" class="SNS">
                            <div class="mb-4">
                                <div class="social-button mb-2">
                                    <a href="https://kauth.kakao.com/oauth/authorize?client_id=b2f72c2fd16ce9a5b5ee4b0c3c6b28e2&redirect_uri=http://localhost:1111/login&response_type=code">
                                        <img src="@/assets/images/KakaoLoginCircle.png">
                                    </a>
                                    <a href="">
                                        <img src="@/assets/images/NaverLoginCircle.png">
                                    </a>
                                    <a href="">
                                        <img src="@/assets/images/GoogleLoginCircle.png">
                                    </a>
                                    <a href="">
                                        <img src="@/assets/images/FaceLoginCircle.png">
                                    </a>
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
    name: 'PageLogin',
    data() {  //해당 컴포넌트에서 사용할 변수 초기화 처리
        return {
            requestBody: {},
            user_id: '',
            user_pw: '',
            remeberMe: false,
        }
    },
    created() {
        this.user_id = localStorage.getItem('rememberUserId') || '';
    },
    methods: {
        changePage() {
            //저장된 라우터를 이용해서 페이지 url 지정
            this.$router.push({
                path: './main'
            })
        },
        loginok_member() {
            if (this.user_id !== undefined) {
                this.$axios.get(
                    this.$serverUrl + '/members/' + this.user_id
                ).then((res) => {
                    console.log("loginok_member 확인 : " + res.data);

                    this.requestBody = res.data;
                    console.log('userId : ' + this.requestBody.userId);
                    
                    if (this.user_id == this.requestBody.userId) {
                        sessionStorage.setItem('userId', this.requestBody.userId);
                        sessionStorage.setItem('userName', this.requestBody.userName);
                        
                        // 로그인이 성공했으므로, PageMain 이 출력되게 함
                        this.changePage();
                        
                        // 로그인 성공 시 아이디 저장 체크 여부 확인 후 로컬 스토리지에 저장
                        if (this.rememberMe) {
                            localStorage.setItem('rememberedUserId', this.user_id);
                        } else {
                            localStorage.removeItem('rememberedUserId');
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                    alert('회원 정보가 없습니다. 확인하고 다시 로그인하세요.');
                    this.$router.go(0); // 현재 페이지 유지함
                });
            }
        },
        fnLogin(){
            //input 태그의 v-model 속성에 지정한 이름을 그대로 사용함
            //input 태그에 기록된 값을 의미함
            //document.getElementById('user_id').value 과 같음
            //v-model='user_id'  => this.user_id 사용
            if(this.user_id === ''){
                alert('아이디를 입력하세요.')                
                this.$router.go(0) //현재 페이지 유지함
            }

            if(this.user_pw === ''){
                alert('암호를 입력하세요.')
                this.$router.go(0) //현재 페이지 유지함
            }

            //서버측으로 아이디와 암호를 전달하고,
            //인증이 성공하면 토큰을 받도록 함
            if(this.user_id !== undefined){
                this.$axios.post(this.$serverUrl + '/login/', 
                    {
                        userId: this.user_id,
                        userPwd: this.user_pw
                    }, {
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: 'token', //인증방식은 'token' 방식
                        }
                    }).then((res) => {
                        //요청 처리가 성공했다면
                        if(res.status == 200){
                            console.log("token success : " + res)
                            //javascript API : LocalStorage, SessionStorage 객체
                            //client 브라우저에 저장
                            //LocalStorage : 브라우저 종료하고 다시 열어도 저장 유지함
                            //SessionStorage : 브라우저가 종료되면 저장 정보가 사라짐
                            sessionStorage.setItem('token', res.data.token)
                            //토큰만 받았으므로, 로그인한 회원정보를 요청함
                            this.loginok_member();
                        }
                    })
                    .catch((err) => {
                        //요청 처리가 실패했다면
                        console.log(err)
                        alert('회원 정보가 없습니다. 확인하고 다시 로그인하세요.')
                        this.$router.go(0) //현재 페이지 유지함
                    }
                );
            }
        },
    },
}
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
    }
    .email-id {
        margin: 5px 0px 5px 0px;
        width: 243px; 
        height: 34px;
    }
    .pw {
        margin: 5px 0px 10px 0px;
        width: 243px; 
        height: 34px;
    }
   .social-button {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
   }
   .social-button a img{
        border-style: none;
        width: 50px;
        margin: 10px 10px;
   }
   .id_pwd_enroll {
        margin: 20px 0px 20px 0px;
   }
   .SNS {
        border: none;  /* 각 경계 속성 제거 */
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
        background: rgb(251,33,117);
        background: linear-gradient(0deg, rgba(251,33,117,1) 0%, rgba(234,76,137,1) 100%);
        color: #fff;
        overflow: hidden;
    }
    .login:hover {
        text-decoration: none;
        color: #fff;
    }
    .login:before {
        position: absolute;
        content: '';
        display: inline-block;
        top: -180px;
        left: 0;
        width: 30px;
        height: 100%;
        background-color: #fff;
        animation: shiny-btn1 3s ease-in-out infinite;
    }
    .login:hover{
        opacity: .7;
    }
    .login:active{
        box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
                -4px -4px 6px 0 rgba(116, 125, 136, .2), 
        inset -4px -4px 6px 0 rgba(255,255,255,.2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
    }
    .id input,
    .pwd input {
        text-align: left;
    }
    .id input::placeholder,
    .pwd input::placeholder {
        text-align: center;
    }
</style>
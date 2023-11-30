<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <!-- 로그인 박스 띄우는 영역 -->
                <div class="container mx-auto p-6">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <h1 class="text-2xl font-semibold mb-6">All About U</h1>
                        <form @submit.prevent="fnLogin">
                            <div class="mb-4">
                                <input type="text" v-model="user_id" placeholder="이메일 주소 또는 아이디" class="w-full p-2 border rounded-md">
                            </div>
                            <div class="mb-4">
                                <input type="password" v-model="user_pw" placeholder="비밀번호" class="w-full p-2 border rounded-md">
                            </div>
                            <div class="mb-4">
                                <div class="flex justify-between items-center">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox">
                                        <span class="ml-2">아이디 저장</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <button type="submit" class="w-full bg-pink-500 text-white p-2 rounded-md">로그인</button>
                            </div>
                            <div class="mb-4 flex justify-between items-center text-sm text-gray-600">
                                <a href="#" class="link-separator">아이디 찾기  |  </a>
                                <a href="#" class="link-separator">비밀번호 찾기  |  </a>
                                <router-link to="/enroll" class="">회원가입</router-link>
                            </div>
                            <div class="mb-4">
                                <div class="social-button mb-2">
                                    <a href="https://kauth.kakao.com/oauth/authorize?client_id=b2f72c2fd16ce9a5b5ee4b0c3c6b28e2&redirect_uri=http://localhost:1111/login&response_type=code">
                                        <img src="@/assets/images/kakaoLogin.png">
                                    </a>
                                </div>
                                <div class="social-button mb-2">
                                    <button>
                                        <img src="@/assets/images/naverLogin.png" alt="Naver" class="social-icon">
                                    </button>
                                </div>
                                <div class="social-button mb-2">
                                    <button>
                                        <img src="@/assets/images/googleLogin.png" alt="Google" class="social-icon">
                                    </button>
                                </div>
                                <div class="social-button">
                                    <button type="button" class="w-full text-left">Face로그인</button>
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
            user_pw: ''
        }
    },
    methods: {
        changePage() {
            //저장된 라우터를 이용해서 페이지 url 지정
            this.$router.push({
                path: './main'
            })
        },
        loginok_member() {
            //로그인 상태 확인용 토큰을 받았을 때
            //로그인한 회원 정보를 요청함
            if(this.user_id !== undefined){
                this.$axios.get(
                    this.$serverUrl + '/members/' + this.user_id
                ).then((res) => {
                    //회원 정보 요청 성공시
                    console.log("loginok_member 확인 : " + res.data);

                    this.requestBody = res.data
                    console.log('userId : ' + this.requestBody.userId);
                    if(this.user_id == this.requestBody.userId){
                        //각 페이지 출력에 필요한 회원정보 sessionStorage 에 저장 처리
                        sessionStorage.setItem('userId', this.requestBody.userId)
                        sessionStorage.setItem('userName', this.requestBody.userName)
                        
                        //로그인이 성공했으므로, PageMain 이 출력되게 함
                        this.changePage();
                    }
                }).catch((err) => {
                    console.log(err)
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

<style>
   /* 카카오로그인 버튼
    const KakaoBtn = styled.img
  cursor: pointer;
  position: relative;
  left: 10px;
  top: 14px;
  width: 150px;
  height: 36px; */

</style>
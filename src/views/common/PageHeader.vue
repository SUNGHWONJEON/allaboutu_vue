<template>
    <!-- Header Section Begin -->
    <header class="header" ref="header" >
        <!--메뉴-->
        <nav class="header_menu">
            <!--로고-->
            <div class="header_logo left">
                <RouterLink :to="selList[0].path"><img src="@/assets/images/logo.png" alt=""></RouterLink>
            </div>

            <!--메뉴-->
            <div class="header_text center">
                <ul>
                    <li v-for="(item, i) in selList" :key="i">
                        <RouterLink  
                            ref="btns" 
                            :to="item.path" 
                            :class="{ active: isActive(item.path) }"
                            v-if="i !== 0 && (item.role == null || checkUserRole())"
                        >
                        {{ item.text }}
                        </RouterLink >
                    </li>
                </ul>
            </div>
            
            <!-- 로그인 -->
            <div class="header_right right">
                <div class="header_right_widget">
                    <!-- 로그인되어 있을 때 --> 
                    <template v-if="isLoggedIn == true">
                        <img src="@/assets/images/default_profile.png" style="width: 30px; height: 30px; border-radius: 100%" @click="goToMyPage">
                        <div style="margin-left: 2px; font-size: 12px">
                            <div style="line-height: 14px; margin: 4px 0px 0px 0px">{{ username }}님</div>
                        
                            <router-link to="/logout" @click="logout">
                                <div class="myinfo-box-div">
                                    <div>로그아웃</div>
                                </div>
                            </router-link>
                        </div>
                    
                    </template>
                    <!-- 로그인되어 있지 않을 때 -->
                    <template v-else>
                        <router-link to="/login">
                            <div style="display: flex;">
                            <div class="myinfo-box-div">
                                <img src="@/assets/images/default_profile.png" style="width: 30px; height: 30px border-radius: 100%">
                            </div>
                                <div style="font-size: 14px; margin: 4px" @click="login">로그인</div>
                            </div>
                        </router-link>
                    </template>
                </div>
            </div>
        </nav>
    </header>
    <!-- Header Section End -->
    
    
</template>

<script>
import { useRoute } from 'vue-router';
import base64 from 'base-64';
import axios from 'axios';

export default ({
    setup() {
    const route = useRoute();

    function isActive(path) {
        //console.log('path : ' + path.split('/')[1]);
        //console.log('route.path : ' + route.path.split('/')[1]);
        return path.split('/')[1] == route.path.split('/')[1];
    }

    function checkUserRole() {
        let userId = sessionStorage.getItem('userId');
        
        // 로그인 안한 경우이거나 일반 사용자인 경우
        if (userId == null || !userId.includes('admin')) return false;
        
        return true;
    }

    return {
      isActive,
      checkUserRole,
    };
  },
    data(){
        return {
            username: "",
            isLoggedIn: false,
            selList: [
                {
                    id: 0
                    ,text: 'HOME'
                    ,path: '/'
                },
                {
                    id: 1
                    ,text: 'NOTICE'
                    ,path: '/notice'
                },
                {
                    id: 2
                    ,text: 'PERSONAL COLOR'
                    ,path: '/personal'
                },
                {
                    id: 3
                    ,text: 'STYLE MATCH'
                    ,path: '/style'
                },
                {
                    id: 4
                    ,text: 'FACE MATCH'
                    ,path: '/face'
                },
                {
                    id: 5
                    ,text: 'COMMUNITY'
                    ,path: '/board'
                },
                {
                    id: 6
                    ,text: 'ADMIN'
                    ,path: '/admin'
                    ,role: 'admin'
                }
            ]
        }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() { //이벤트 : 이 컴포넌트(App.vue)마운트 되면
        window.addEventListener('scroll', this.handleScroll);
        this.login();
    },
    watch: {
        $route(to, from) {
            const headerElement = this.$refs.header;
                
            if (to.name === 'PageMain') {
                headerElement.classList.add('main');
            } else {
                headerElement.classList.remove('main');
            }


        }
    },
    methods: {
        handleScroll() {
            const scrT = window.pageYOffset || document.documentElement.scrollTop;
            const headerElement = this.$refs.header;

            if (scrT === 0) {
                headerElement.classList.remove('background');
                headerElement.classList.add('backgroundnone');
            } else {
                headerElement.classList.remove('backgroundnone');
                headerElement.classList.add('background');
            }
        },
        goToMyPage() {
            // 이미지 클릭 시 '/member/mypage'로 이동
            this.$router.push('/member/mypage');
        },

        // 로그인
        // 성공시 isLoggedIn을 true로 설정하고 username을 설정
        login() {
            if (sessionStorage.getItem('accessToken') != null) {
                let token = sessionStorage.getItem('accessToken');
                let payload = token.substring(token.indexOf('.')+1, token.lastIndexOf('.'));
                let decodingInfo = base64.decode(payload);
                
                console.log('token: ' + token);
                console.log('decodingInfo: ' + decodingInfo);
                
                this.isLoggedIn = true;
                this.userId = JSON.parse(decodingInfo).sub;
                this.$axios.get('/member/' + this.userId).then((res) => {
                    console.log(res.data);
                    this.username = res.data.userName;
                });
                this.$axios.get('/member/' + this.userId).then((res) => {
                    console.log(res.data);
                    this.userProfile = res.data.userProfile;
                });

                let expired = JSON.parse(decodingInfo).exp;
                console.log('isLoggedIn: ' + this.isLoggedIn)
                console.log(this.userId);
                console.log(expired);

                return;
            }
        },

        //로그아웃
        //성공시 isLoggedIn을 false로 설정하고 username 초기화
        logout() {
            this.isLoggedIn = false;
            this.username = "";
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('userId');

            this.$router.push('/');
        },
        //로그인한 사용자 이름 표시
        data() {
            return {
            isLoggedIn: false,
            username: "", // 로그인한 사용자의 이름을 표시할 변수
            };
        },
    }
})
</script>

<style>
    @import '@/assets/css/header.css' 
</style>
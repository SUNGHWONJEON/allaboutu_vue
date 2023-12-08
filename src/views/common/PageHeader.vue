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
                            active-class="active"
                            v-if="i !== 0"
                        >
                        {{ item.text }}
                        </RouterLink >
                    </li>
                </ul>
            </div>
            
            <!--장바구니, 찜-->
            <div class="header_right right">
                <div class="header_right_widget">
                    <!-- 로그인되어 있을 때 --> 
                    <template v-if="isLoggedIn">
                        <img src="@/assets/images/default_profile.png" style="width: 30px; height: 30px">
                        <div>{{ username }} 님</div>
                        <router-link to="/logout">
                            <div class="myinfo-box-div">
                                <div @click="logout">로그아웃</div>
                            </div>
                        </router-link>
                    </template>
                    <!-- 로그인되어 있지 않을 때 -->
                    <template v-else>
                        <router-link to="/login">
                            <div class="myinfo-box-div">
                                <img src="@/assets/images/default_profile.png" style="width: 30px; height: 30px">
                                <div @click="login">로그인</div>
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
export default ({
    data(){
        return {
            selList: [
                {
                    id: 0
                    ,text: 'HOME'
                    ,path: '/'
                    ,isActive: false
                },
                {
                    id: 1
                    ,text: 'NOTICE'
                    ,path: '/notice'
                    ,isActive: false
                },
                {
                    id: 2
                    ,text: 'PERSONAL COLOR'
                    ,path: '/personal'
                    ,isActive: false
                },
                {
                    id: 3
                    ,text: 'STYLE MATCH'
                    ,path: '/style'
                    ,isActive: false
                },
                {
                    id: 4
                    ,text: 'FACE MATCH'
                    ,path: '/face'
                    ,isActive: false
                },
                {
                    id: 5
                    ,text: 'COMMUNITY'
                    ,path: '/board'
                    ,isActive: false
                },
                {
                    id: 6
                    ,text: 'ADMIN'
                    ,path: '/admin'
                    ,isActive: false
                }
            ]
        }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() { //이벤트 : 이 컴포넌트(App.vue)마운트 되면
        window.addEventListener('scroll', this.handleScroll);
    },
    watch: {
        $route(to) {
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
        // 로그인
        // 성공시 isLoggedIn을 true로 설정하고 username을 설정
        login() {
            this.isLoggedIn = true;
            this.username = "{{ username }}";
        },
        //로그아웃
        //성공시 isLoggedIn을 false로 설정하고 username 초기화
        logout() {
            this.isLoggedIn = false;
            this.username = "";
        },
        //로그인한 사용자 이름 표시
        data() {
            return {
            isLoggedIn: false,
            username: "", // 로그인한 사용자의 이름을 표시할 변수
            };
        },
        //링크 
        pageLink (id) {

            this.$refs.btns.forEach(el => {
                el.classList.remove('active');
            });
            
            // 현재 클릭한 버튼을 활성화 처리
            if(id > 0){
                const btn = this.$refs.btns[id-1];
                //console.log('btn : ' + btn);
                btn.classList.add('active');
            }
            
            this.$router.push({ path: this.selList[id].path })
            //this.$router.go(this.$router.currentRoute);
        }
    }
})
</script>

<style>
    @import '@/assets/css/header.css' 
</style>
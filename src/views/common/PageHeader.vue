<template>
    <!-- Header Section Begin -->
    <header class="header" ref="header" >
        <!--메뉴-->
        <nav class="header_menu">
            <!--로고-->
            <div class="header_logo left">
                <button v-on:click="pageLink(0)"><img src="@/assets/images/logo.png" alt=""></button>
            </div>

            <!--메뉴-->
            <div class="header_text center">
                <ul>
                    <li v-for="(item, i) in selList" :key="i">
                        <button v-on:click="pageLink(i)">{{ item.text }}</button>
                    </li>
                </ul>
            </div>
            
            <!--장바구니, 찜-->
            <div class="header_right right">
                <div class="header_right_widget">
                    <a href="" class="myinfo-box hidden">
                        <img src="@/assets/images/launcher.png" style="width: 30px; height: 30px">
                        <span>로그인</span>
                    </a>
                    <a href="" class="myinfo-box ">
                        <img src="@/assets/images/launcher.png" style="width: 30px; height: 30px">
                        <div class="myinfo-box-div">
                            <div>님</div>
                            <div>로그아웃</div> 
                        </div>
                    </a>
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
            /*
            <li><button v-on:click="pageLink(1)">NOTICE</button></li>
                    <li><button v-on:click="pageLink(2)">PERSONAL COLOR</button></li>
                    <li><button v-on:click="pageLink(3)">STYLE MATCH</button></li>
                    <li><button v-on:click="pageLink(4)">FACE MATCH</button></li>
                    <li><button v-on:click="pageLink(5)">COMMUNITY</button></li>
                    <li><button v-on:click="pageLink(6)">ADMIN</button></li>
                    */

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
                }
            ],

            selectCount : 3
            ,btnList: []
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

            switch (to.name) {
                case 'FaceMain':
                    
                    break;
                case 'StyleMain':
                    
                    break;
                case 'FaceMain':
                    
                    break;
                case 'CodyMain':
                    
                    break;
                case 'PersonalMain':
                    
                    break;
                case 'AdminMain':
                    
                    break;
                case 'BoardMain':
                    
                    break;
                case 'NoticeMain':
                    
                    break;
                default:

                    break;
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
        //링크 
        pageLink (id) {
            this.$router.push({ path: this.selList[id].path })
        }
        
    }
})
</script>

<style>
    @import '@/assets/css/header.css' 
</style>
<template>
    <!-- Header Section Begin -->
    <header class="header" ref="header">
        <!--메뉴-->
        <nav class="header_menu">
            <!--로고-->
            <div class="header_logo left">
                <a href=""><img src="@/assets/images/logo.png" alt=""></a>
            </div>

            <!--메뉴-->
            <div class="header_text center">
                <ul>
                    <li><button v-on:click="pageLink(1)">NOTICE</button></li>
                    <li><button v-on:click="pageLink(2)">PERSONAL COLOR</button></li>
                    <li><button v-on:click="pageLink(3)">STYLE MATCH</button></li>
                    <li><button v-on:click="pageLink(4)">FACE MATCH</button></li>
                    <li><button v-on:click="pageLink(5)">COMMUNITY</button></li>
                    <li><button v-on:click="pageLink(6)">ADMIN</button></li>
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
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted() { //이벤트 : 이 컴포넌트(App.vue)마운트 되면
        window.addEventListener('scroll', this.handleScroll);
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
            let str = '';

            switch (id) {
                case 1:
                    str = 'notice';
                    break;
                case 2:
                    str = 'personal';
                    break;
                case 3:
                    str = 'style';
                    break;
                case 4:
                    str = 'face';
                    break;
                case 5:
                    str = 'board';
                    break;
                case 6:
                    str = 'admin';
                    break;
                default:
                    str = '';
                    break;
            }
            // object
            this.$router.push({ path: str })
        }
        
    }
})
</script>

<style>
    @import '@/assets/css/header.css' 
</style>
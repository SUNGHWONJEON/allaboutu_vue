//url path설정
//url path와 연결될 페이지 지정
//import된 vue파일 안에서 저장된 

//라이브러리가 제공하는 함수를 임포트할때는 {함수명} 표기함
import { createRouter, createWebHistory } from "vue-router";

//라우터가 연결할 페이지(컴포넌트) 임포트
import PageLogin from '@/views/member/PageLogin.vue'
import PageMain from '@/views/common/PageMain.vue'


//각 페이지 컴포넌트에 대한 url path 지정
//routes는 고정변수임

const routes = [
    {
        path: '/',
        name: 'PageLogin',
        component: PageLogin
    },
    {
        path: '/main',
        name: 'PageMain',
        component: PageMain
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//이 js파일 밖에서 import한 대상이 사용할 수 있게 처리함
export default router


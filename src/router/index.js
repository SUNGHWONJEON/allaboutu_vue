//url path설정
//url path와 연결될 페이지 지정
//import된 vue파일 안에서 저장된 

//라이브러리가 제공하는 함수를 임포트할때는 {함수명} 표기함
import { createRouter, createWebHistory } from "vue-router";

//라우터가 연결할 페이지(컴포넌트) 임포트
import PageLogin from '@/views/member/PageLogin.vue'
import PageMain from '@/views/common/PageMain.vue'
import StyleMain from '@/views/style/StyleMain.vue'
import CodyMain from '@/views/cody/CodyMain.vue'
import FaceMain from '@/views/face/FaceMain.vue'
import PersonalMain from '@/views/personal/PersonalMain.vue'
import AdminMain from '@/views/admin/AdminMain.vue'
import BoardMain from '@/views/board/BoardMain.vue'
import NoticeMain from '@/views/notice/NoticeMain.vue'
import RecommandMain from '@/views/recommand/RecommandMain.vue'
import NoticeWrite from '@/views/notice/NoticeWrite.vue';
import NoticeDetail from '@/views/notice/NoticeDetail.vue';
import BoardWrite from '@/views/board/BoardWrite.vue'

//각 페이지 컴포넌트에 대한 url path 지정
//routes는 고정변수임

const routes = [
    {
        path: '/',
        name: 'PageMain',
        component: PageMain
    },
    {
        path: '/main',
        name: 'PageLogin',
        component: PageLogin
    },
    {
        path: '/style',
        name: 'StyleMain',
        component: StyleMain
    },
    {
        path: '/cody',
        name: 'CodyMain',
        component: CodyMain
    },
    {
        path: '/face',
        name: 'FaceMain',
        component: FaceMain
    },
    {
        path: '/personal',
        name: 'PersonalMain',
        component: PersonalMain
    },
    {
        path: '/admin',
        name: 'AdminMain',
        component: AdminMain
    },
    {
        path: '/board',
        name: 'BoardMain',
        component: BoardMain
    },
    {
        path: '/boards/write',
        name: 'BoardWrite',
        component: BoardWrite
    },
    {
        path: '/notice',
        name: 'NoticeMain',
        component: NoticeMain
    },
    {
        path: '/recommand',
        name: 'RecommandMain',
        component: RecommandMain
    },
        path: '/notice/write',
        name: 'NoticeWrite',
        component: NoticeWrite
    },
    {
        path: '/notice/detail',
        name: 'NoticeDetail',
        component: NoticeDetail
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//이 js파일 밖에서 import한 대상이 사용할 수 있게 처리함
export default router


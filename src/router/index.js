//url path설정
//url path와 연결될 페이지 지정
//import된 vue파일 안에서 저장된 

//라이브러리가 제공하는 함수를 임포트할때는 {함수명} 표기함
import { createRouter, createWebHistory } from "vue-router";

//라우터가 연결할 페이지(컴포넌트) 임포트
import PageLogin from '@/views/member/PageLogin.vue'
import PageEnroll from '@/views/member/PageEnroll.vue'
import PageMain from '@/views/common/PageMain.vue'
import StyleMain from '@/views/style/StyleMain.vue'
import CodyMain from '@/views/cody/CodyMain.vue'
import CodyDetail from '@/views/cody/CodyDetail.vue'
import FaceMain from '@/views/face/FaceMain.vue'
import PersonalMain from '@/views/personal/PersonalMain.vue'
import BoardMain from '@/views/board/BoardMain.vue'
import BoardWrite from '@/views/board/BoardWrite.vue'
import BoardHome from '@/views/board/BoardHome.vue';
import BoardDetail from '@/views/board/BoardDetail.vue';
import NoticeMain from '@/views/notice/NoticeMain.vue'
import NoticeWrite from '@/views/notice/NoticeWrite.vue';
import NoticeDetail from '@/views/notice/NoticeDetail.vue';
import NoticeUpdate from '@/views/notice/NoticeUpdate.vue';
import PageMyPage from '@/views/member/PageMyPage.vue';
import AdminMain from '@/views/admin/AdminMain.vue'
import AdminUser from '@/views/admin/AdminUser.vue'
import AdminHome from '@/views/admin/AdminHome.vue'

import WebSiteMain from '@/views/website/WebSiteMain.vue'

//각 페이지 컴포넌트에 대한 url path 지정
//routes는 고정변수임

const routes = [
    {
        path: '/',
        name: 'PageMain',
        component: PageMain
    },
    {
        path: '/login',
        name: 'PageLogin',
        component: PageLogin
    },
    {
        path: '/enroll',
        name: 'enroll',
        component: PageEnroll
    },
    {
        path: '/style',
        name: 'StyleMain',
        component: StyleMain,
        children: [
            {
                path: '/style/cody',
                name: 'CodyMain',
                component: CodyMain
            },
            {
                path: '/style/codydetail',
                name: 'CodyDetail',
                component: CodyDetail
            }
        ]
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
        path: '/reports',
        name: 'AdminUser',
        component: AdminUser
    },
    {
        path: '/admins',
        name: 'AdminHome',
        component: AdminHome
    },
    {
        path: '/board',
        name: 'BoardMain',
        component: BoardMain,
        children: [
            {
                path: '',
                name: 'BoardHome',
                component: BoardHome
            },
            {
                path: '/board/:boardNum',
                name: 'BoardDetail',
                component: BoardDetail
            },
            {
                path: '/board/write',
                name: 'BoardWrite',
                component: BoardWrite
            },
            {
                path: '/board/write/:boardNum',
                name: 'BoardWriteForEdit',
                component: BoardWrite,
                beforeEnter: (to, from, next) => {
                    // const userAccessPermission = checkUserPermission();
                    const userAccessPermission = true;
        
                    if (userAccessPermission) {
                        next();
                    } else {
                        alert('접근 권한이 없습니다.');
                        next('/');
                    }
                },
            },
        ]
    },
    {
        path: '/notice',
        name: 'NoticeMain',
        component: NoticeMain
    },
    {
        path: '/notice/write',
        name: 'NoticeWrite',
        component: NoticeWrite
    },
    {
        path: '/notice/detail/:noticeNum',
        name: 'NoticeDetail',
        component: NoticeDetail
    },
    {
        path: '/notice/update',
        name: 'NoticeUpdate',
        component: NoticeUpdate
    },
    {
        path: '/website',
        name: 'WebSiteMain',
        component: WebSiteMain
    },
    {
        path: '/member/mypage',
        name: 'PageMyPage',
        component: PageMyPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(){
      return { top: 0 }
    }
})

//이 js파일 밖에서 import한 대상이 사용할 수 있게 처리함
export default router

<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <AdminHome /><!-- 관리자 게시글관리 컴포넌트 -->
            </div>
            <div class="contents-boxes">
                <AdminUser /><!-- 관리자 회원관리 컴포넌트 -->
            </div>
        </div>
    </div>

    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import AdminHome from '@/views/admin/AdminHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'
import AdminUser from '@/views/admin/AdminUser.vue'

export default ({
    name: 'AdminMain'
    ,components:{
        PageHeader
        ,AdminHome
        ,PageFooter
        ,AdminUser
    }
})
</script>

<style>
.main-container {
    display: flex;
}
</style>
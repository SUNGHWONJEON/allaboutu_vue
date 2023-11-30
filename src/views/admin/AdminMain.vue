<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div>
                <div class="contents-boxes">
                    <AdminHome /><!-- 관리자 컴포넌트 -->
                </div>
                <div class="contents-boxes">
                    <AdminUser /><!-- 관리자 컴포넌트 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminHome from '@/views/admin/AdminHome.vue'
import AdminUser from '@/views/admin/AdminUser.vue'

export default ({
    name: 'AdminMain'
    ,components:{
        AdminHome
        ,AdminUser
    }
})
</script>

<style>
.main-container {
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
}
</style>
<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <AdminHome /><!-- 관리자 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import AdminHome from '@/views/admin/AdminHome.vue'

export default ({
    name: 'AdminMain'
    ,components:{
        AdminHome
    }
})
</script>
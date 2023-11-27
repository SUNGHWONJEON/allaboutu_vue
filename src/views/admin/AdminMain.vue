<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <AdminHome /><!-- 관리자 컴포넌트 -->
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import AdminHome from '@/views/admin/AdminHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'AdminMain'
    ,components:{
        PageHeader
        ,AdminHome
        ,PageFooter
    }
})
</script>
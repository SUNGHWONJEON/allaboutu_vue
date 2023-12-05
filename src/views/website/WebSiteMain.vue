<template>
    <PageHeader /><!-- 헤더 컴포넌트 -->
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <WebSiteHome /><!-- 페이스 컴포넌트 -->
            </div>
        </div>
    </div>
    <PageFooter /><!-- 푸터 컴포넌트 -->
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import WebSiteHome from '@/views/website/WebSiteHome.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default ({
    name: 'WebSiteMain'
    ,components:{
    PageHeader,
    WebSiteHome,
    PageFooter,
    WebSiteHome
}
})
</script>
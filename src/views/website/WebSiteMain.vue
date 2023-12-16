<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <WebSiteHome /><!-- 페이스 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>

import WebSiteHome from '@/views/website/WebSiteHome.vue'

export default ({
    name: 'WebSiteMain',
    components:{
        WebSiteHome
    }
})
</script>
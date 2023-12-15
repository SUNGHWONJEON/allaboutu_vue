<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <WebSiteHome /><!-- 페이스 컴포넌트 -->
                <WebSiteInsert />
            </div>
        </div>
    </div>
</template>

<script>

import WebSiteHome from '@/views/website/WebSiteHome.vue'
import WebSiteInsert from '@/views/website/WebSiteInsert.vue'

export default ({
    name: 'WebSiteMain',
    components:{
        WebSiteHome,
        WebSiteInsert
    }
})
</script>
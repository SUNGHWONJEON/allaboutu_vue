<template>
    <main class="main-wrapper">
        <PageSlide /><!-- 슬라이드 컴포넌트 -->
        <PageHome /><!-- 홈 컴포넌트 -->
    </main>
</template>

<script>

import PageHome from '@/views/common/PageHome.vue'
import PageSlide from '@/views/common/PageSlide.vue'

export default ({
    name: 'PageMain'
    ,components:{
        PageHome
        ,PageSlide
    }
})
</script>
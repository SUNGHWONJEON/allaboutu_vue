<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <StyleHome /><!-- 퍼스널컬러 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import StyleHome from '@/views/style/StyleHome.vue'

export default ({
    name: 'StyleMain'
    ,components:{
        StyleHome
    }
})
</script>
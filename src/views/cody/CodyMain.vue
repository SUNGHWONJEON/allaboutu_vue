<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <CodyHome /><!-- 코디 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import CodyHome from '@/views/cody/CodyHome.vue'

export default ({
    name: 'CodyMain'
    ,components:{
        CodyHome
    }
})
</script>
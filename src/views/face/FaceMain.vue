<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <FaceHome /><!-- Face 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import FaceHome from '@/views/face/FaceHome.vue'

export default ({
    name: 'FaceMain'
    ,components:{
        FaceHome
    }
})
</script>
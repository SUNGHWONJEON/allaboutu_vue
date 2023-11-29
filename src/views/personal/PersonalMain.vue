<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <PersonalHome /><!-- 퍼스널컬러 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import PersonalHome from '@/views/personal/PersonalHome.vue'

export default ({
    name: 'PersonalMain'
    ,components:{
        PersonalHome
    }
})
</script>
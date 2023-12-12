<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <PersonalHome /><!-- 퍼스널컬러 컴포넌트 -->
                <PersonalRecommand v-if="isComponentVisible" /><!-- 퍼스널컬러 추천 컴포넌트 -->
            </div>
        </div>
    </div>
</template>

<script>
import PersonalHome from '@/views/personal/PersonalHome.vue'
import PersonalRecommand from '@/views/personal/PersonalRecommand.vue';

export default {
    name: 'PersonalMain'
    ,components:{
        PersonalHome,
        PersonalRecommand
    },
    data(){
        return {
            isComponentVisible: false, 
        }
    },
    methods: {
        showComponent(){
            this.isComponentVisible = true;
        }  // 테스트중
    }  
}
</script>
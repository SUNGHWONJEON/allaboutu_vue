<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <StyleHome @show-component="showComponent" /><!-- 스타일 컴포넌트 -->
                <StyleRecommand v-if="isComponentVisible" /><!-- 스타일 추천 컴포넌트 -->
                
            </div>
        </div>
    </div>
</template>

<script>
import StyleHome from '@/views/style/StyleHome.vue'
import StyleRecommand from '@/views/style/StyleRecommand.vue';

export default ({
    name: 'StyleMain'
    ,components:{
        StyleHome,
        StyleRecommand
    },
    data(){
        return {
            isComponentVisible: true
        }
    },
    methods: {
        showComponent() {
            this.isComponentVisible = true;
        }
    }
})
</script>
<template>
  <div id="app">
    <PageHeader /><!-- 헤더 컴포넌트 -->
      <router-view /><!--페이지 이동이 표시될 영역을 의미함-->
    <PageFooter /><!-- 푸터 컴포넌트 -->
  </div>
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default {
  name: 'App'
  ,components:{
    PageHeader
    ,PageFooter
  },
  data(){
    return {
      headerClass: 'default-header'// 기본 헤더 스타일 클래스
    }
  }
  ,mounted() { //이벤트 : 이 컴포넌트(App.vue)마운트 되면
    this.fnMain()

  }
  ,methods: { //함수 정의
    fnMain() {
      this.$router.push({
        path: './' //PageMain이 동작됨 -> 라우터로 동작되는 것은 router-view에 표시됨
      })
    }

  }
}
</script>

<style>
@import '@/assets/css/main.css';

.default-header {
  background-color: rgba(255,255,255,0.9);
  box-shadow: 0px 5px 10px rgba(91, 91, 91, 0.1);
}

.main-page-header {
  background: none;
	box-shadow: 0px 0px 0px rgba(91, 91, 91, 0);
}

</style>

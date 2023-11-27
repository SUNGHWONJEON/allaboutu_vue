<template>
  <div id="app">
    <router-view /><!--페이지 이동이 표시될 영역을 의미함-->
  </div>
</template>

<script>

export default {
  name: 'App'
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
@import '@/assets/css/main.css' 
</style>

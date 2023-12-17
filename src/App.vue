<template>
  <div id="app">
    <!-- v-if 를 사용하여 로그인 페이지에서만 Header와 Footer를 감추도록 설정 -->
    <PageHeader v-if="showHeader" />
    <router-view />
    <PageFooter v-if="showFooter" />
  </div>
</template>

<script>
import PageHeader from '@/views/common/PageHeader.vue'
import PageFooter from '@/views/common/PageFooter.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  },
  data() {
    return {
      showHeader: true, // Header를 보이게 할지 여부
      showFooter: true  // Footer를 보이게 할지 여부
    };
  },
  watch: {
    '$route'() {
      // 라우트 변경 시 실행되는 watch
      this.updateHeaderFooterVisibility();
    }
  },
  mounted() {
    // 초기 로딩 시 실행
    this.updateHeaderFooterVisibility();
  },
  methods: {
    // Login 페이지와 Enroll 페이지가 열리면 Header, Footer 숨기는 처리
    updateHeaderFooterVisibility() {
      const isLoginPage = this.$route.path === '/login';
      const isEnrollPage = this.$route.path === '/enroll';
      const isFindIdPage = this.$route.path === '/findid';
      const isFindPwdPage = this.$route.path === '/findpwd';
      const isChangePwdPage = this.$route.path === '/chgpwd';
      const isNaverCallbackPage = this.$route.path === '/login/naver/callback';
      this.showHeader = !isLoginPage && !isEnrollPage && !isFindIdPage && !isFindPwdPage && !isChangePwdPage && !isNaverCallbackPage;
      this.showFooter = !isLoginPage && !isEnrollPage && !isFindIdPage && !isFindPwdPage && !isChangePwdPage && !isNaverCallbackPage;
    },
    fnMain() {
      this.$router.push({
        path: './'
      });
    }
  }
};
</script>

<style>
@import '@/assets/css/main.css';

.default-header {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 5px 10px rgba(91, 91, 91, 0.1);
}

.main-page-header {
  background: none;
  box-shadow: 0px 0px 0px rgba(91, 91, 91, 0);
}

</style>

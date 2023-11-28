import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import axios from 'axios'

const app = createApp(App)

//전역변수 지정
app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverURL = '//loacalhost:2222'

//앱에 라우터 사용 지정
app.use(router).mount('#app')


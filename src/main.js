import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import axios from 'axios'

const app = createApp(App)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AOS from 'aos'
import 'aos/dist/aos.css'

const vuetify = createVuetify({
    components,
    directives,
})

//전역변수 지정
app.config.globalProperties.$axios = axios
app.config.globalProperties.$serverURL = '//loacalhost:2222'
app.config.globalProperties.$styleType = {
    num: -1
}
app.config.globalProperties.$personalType = {
    num: -1
}

//앱에 라우터 사용 지정
app
.use(router)
.use(vuetify)
.use(AOS)
.mount('#app')


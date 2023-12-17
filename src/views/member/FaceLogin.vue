<script setup>
// import axios from '@axios'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const streamVideo = ref(null)
const cameraView = ref(null)
let captureInterval = null
let cancelTokenSource = null
const shouldStartCapture = ref(true)
let base64ImageStr = ref(null)
const email = ref('')

const openCamera = () => {
  closeCamera()
  console.log("openCamera")
  navigator.mediaDevices.getUserMedia({ video: shouldStartCapture.value })
    .then(stream => {
      streamVideo.value = stream
      cameraView.value.srcObject = stream
      cameraView.value.onloadedmetadata = () => {
        cameraView.value.play()
      }

      // shouldStartCapture 값이 true일 때만 capture 함수 호출
      if (shouldStartCapture.value) {
        console.log("shouldStartCapture.value:", shouldStartCapture.value)
        captureInterval = setInterval(capture, 4000)
      }
    })
    .catch(error => {
      console.error('카메라에 접근하는 중 오류 발생:', error)
    })
}

const closeCamera = () => {
  if (streamVideo.value) {
    const tracks = streamVideo.value.getTracks()

    tracks.forEach(track => track.stop())
    streamVideo.value = null

    // 인터벌 제거
    clearInterval(captureInterval)

    // Axios 요청 취소
    if (cancelTokenSource) {
      cancelTokenSource.cancel('카메라 종료')
    }
    
  }
}

const capture = () => {
  if (cameraView.value && cameraView.value.videoWidth) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = cameraView.value.videoWidth
    canvas.height = cameraView.value.videoHeight
    context.drawImage(cameraView.value, 0, 0, canvas.width, canvas.height)

    // 캡처된 이미지를 Base64로 변환하여 저장
    base64ImageStr.value = canvas.toDataURL()
    
    // 캡처된 이미지를 서버로 전송 (서버 URL 및 엔드포인트에 맞게 수정)
    axios.post('/login/face', { id: email.value, image: base64ImageStr.value.split(',')[1] }, {
      cancelToken: cancelTokenSource ? cancelTokenSource.token : undefined,
    })
      .then(response => {
        // if (response.data.result === "failed") {
        //   shouldStartCapture.value = false
        //   console.log('shouldStartCapture:', shouldStartCapture.value)
        //   closeCamera()
        //   console.log('failed 실행')

        //   // const { accessToken, refreshToken, role } = response.data

        //   sessionStorage.setItem('accessToken', response.data.accessToken)
        //   sessionStorage.setItem('refreshToken', response.data.refreshToken)
        //   sessionStorage.setItem('role', response.data.role)
        //   sessionStorage.setItem('userid', email.value)
        //   sessionStorage.setItem('enrollType', 'MEMBER')
        //   axios.defaults.headers['enrollType'] = 'MEMBER'
        //   router.push('/')
        // }
      })
      .catch(error => {
        if (error.response.data.result === "success") {
          shouldStartCapture.value = false
          console.log('shouldStartCapture:', shouldStartCapture.value)
          closeCamera()
          console.log(error.response.data)
          console.log('success 실행')

          const { accessToken, refreshToken, role } = error.response.data

          sessionStorage.setItem('accessToken', accessToken)
          sessionStorage.setItem('refreshToken', refreshToken)
          sessionStorage.setItem('role', role)
          sessionStorage.setItem('userId', email.value)
          sessionStorage.setItem('enrollType', 'MEMBER')
          axios.defaults.headers['enrollType'] = 'MEMBER'
          router.push('/')
        }
          window.location.reload()
      })
  }
}

onMounted(() => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("미디어 장치가 지원되지 않습니다")
  }
})

onBeforeUnmount(() => {
  closeCamera()
})
</script>

<template>
  <div class="face-login-container">
    <div class="pic-title-box">
        <div class="pic-titile">
            FACE LOGIN
        </div>
        <div class="pic-titile-sub">
            얼굴을 인식하여 로그인합니다.
        </div>
    </div>

    <p class="face-login-pbox">
      <video
        ref="cameraView"
        width="720"
        height="480"
      />
    </p>
    <div class="idInputBox">
      <v-text-field
        label-position="left"
        name="login"
        label="아이디"
        type="text"
        id="email"
        v-model="email"
        outlined
        style="text-align: left;"
      >
      </v-text-field>
    </div>
      <div>
        <button class="camBtn" @click="openCamera">
          카메라 켜기
        </button>
        <button class="camBtn" @click="closeCamera">
          카메라 끄기
        </button>
      </div>
    </div>
</template>

<style scoped>
.idInputBox {
  margin-top: 20px;
  width: 260px;
  color: #d558c3;
}

.camBtn {
  margin: 30px;
  padding: 10px;
  border: 2px solid #d558c3;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.camBtn:hover {
  background-color: #d558c3;
  color: #fff;
}

.face-login-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}

.face-login-pbox {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pic-titile-sub {
  text-align: center;
}

</style>
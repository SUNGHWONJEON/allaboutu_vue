<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <!-- 로그인 박스 띄우는 영역 -->
                <div class="container mx-auto p-6">
                    <div class="bg-white shadow-md rounded-lg p-6">
                        <h1 class="text-2xl font-semibold mb-6">All About U</h1>
                        <form>
                            <div class="mb-4">
                                <input type="text" placeholder="이메일 주소 또는 아이디" class="w-full p-2 border rounded-md">
                            </div>
                            <div class="mb-4">
                                <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded-md">
                            </div>
                            <div class="mb-4">
                                <div class="flex justify-between items-center">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox">
                                        <span class="ml-2">아이디 저장</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <button type="submit" class="w-full bg-pink-500 text-white p-2 rounded-md">로그인</button>
                            </div>
                            <div class="mb-4 flex justify-between items-center text-sm text-gray-600">
                                <a href="#" class="link-separator">아이디 찾기  |  </a>
                                <a href="#" class="link-separator">비밀번호 찾기  |  </a>
                                <a href="#" class="">회원가입</a>
                            </div>
                            <div class="mb-4">
                                <p class="text-center text-gray-500 mb-2">또는</p>
                                <div class="social-button mb-2">
                                    <button>
                                        <img src="@/assets/images/kakaoLogin.png" alt="Kakao" class="social-icon">
                                    </button>
                                </div>
                                <div class="social-button mb-2">
                                    <button>
                                        <img src="@/assets/images/naverLogin.png" alt="Naver" class="social-icon">
                                    </button>
                                </div>
                                <div class="social-button mb-2">
                                    <button>
                                        <img src="@/assets/images/googleLogin.png" alt="Google" class="social-icon">
                                    </button>
                                </div>
                                <div class="social-button">
                                    <button type="button" class="w-full text-left">Face로그인</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'PageLogin',
})
</script>

<style>

</style>
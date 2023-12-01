<template>
    <div>
        
    </div>
</template>

<script>
export default ({
    name: 'PageLogin'
    
})
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .profile-image-placeholder {
            background-color: #E5E7EB;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9CA3AF;
            font-size: 1.5rem;
        }
    </style>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-semibold mb-6">마이페이지</h1>
        <div class="flex gap-6">
            <div class="w-1/4">
                <div class="profile-image-placeholder rounded-lg h-48 mb-4">
                    프로필 사진
                </div>
                <ul class="space-y-2">
                    <li>회원번호</li>
                    <li>아이디</li>
                    <li>이름</li>
                    <li>생년월일</li>
                    <li>전화번호</li>
                    <li>이메일</li>
                </ul>
            </div>
            <div class="w-3/4">
                <form class="space-y-4">
                    <input type="text" placeholder="회원번호" class="w-full p-2 border border-gray-300 rounded-lg">
                    <input type="text" placeholder="아이디" class="w-full p-2 border border-gray-300 rounded-lg">
                    <input type="text" placeholder="이름" class="w-full p-2 border border-gray-300 rounded-lg">
                    <input type="date" placeholder="생년월일" class="w-full p-2 border border-gray-300 rounded-lg">
                    <input type="tel" placeholder="전화번호" class="w-full p-2 border border-gray-300 rounded-lg">
                    <input type="email" placeholder="이메일" class="w-full p-2 border border-gray-300 rounded-lg">
                    <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded-lg">프로필 저장</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
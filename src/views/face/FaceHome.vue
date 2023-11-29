<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
        <!-- Photo upload box -->
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <div class="mb-4">
                <label for="photo-upload" class="cursor-pointer">
                    <div class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-64 w-64 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7l9 9 9-9" />
                        </svg>
                        <span class="text-gray-700">사진을 올려주세요</span>
                    </div>
                </label>
                <input id="photo-upload" type="file" class="hidden" accept="image/*" />
            </div>
            <!-- Buttons -->
            <div class="flex justify-center gap-4">
                <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">
                    사진 업로드
                </button>
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r">
                    완료
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

div > div:last-child {
  margin-top: 20px;
}
</style>


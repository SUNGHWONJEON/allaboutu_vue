<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            PHOTO
        </div>
        <div class="pic-titile-sub">
            전신 사진을 업로드하세요.
        </div>
    </div>
    
    
    <div class="pic-box">
        <div class="pic-upload-box">
            <div class="pic-upload">
                <label for="pic_up" ref="pic_label" :class="{ 'pic-label': imageUploaded}">업로드</label>
                <input class="pic-img-box" id="pic_up" type="file" @change="handleFileUpload" accept="image/*">
                <img class="my-img-box" :src="imageUrl" v-if="imageUrl" :style="{ display: imageUrl ? 'block' : 'none' }">
            </div>
            
            <div class="pic-btn-box">
                <!--<button class="pic-btn" v-on:click="fnUpClick">사진찍기</button>-->
                <button class="pic-btn" v-on:click="fnTypeClick">치수보기</button>
            </div>
        </div>

        <div class="pic-inputbox">
            <div class="pic-input-div">
                <span>성별을 입력해주세요.</span>
                <input type="text">
            </div>
            <div class="pic-input-div">
                <span>나이를 입력해주세요.</span>
                <input type="number">
            </div>
            <div class="pic-input-div">
                <span>키를 입력해주세요.</span>
                <input type="number">
            </div>
            <div class="pic-input-div">
                <span>몸무게를 입력해주세요.</span>
                <input type="number">
            </div>
        </div>

    </div>

    
</template>

<script>
import { ref } from 'vue';

export default ({
    setup() {
        const imageFile = ref(null);
        const imageUrl = ref(null);
        const imageUploaded = ref(false);

        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            imageFile.value = file;
            imageUrl.value = URL.createObjectURL(file);
            imageUploaded.value = true;
        };

        return {
            imageFile,
            imageUrl,
            imageUploaded,
            handleFileUpload
        };
    },
    methods: {
        fnTypeClick(){
            
        }
    }
})
</script>

<style>
@import '@/assets/css/base_pic.css';
</style>
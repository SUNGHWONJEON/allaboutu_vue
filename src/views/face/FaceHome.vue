<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            PHOTO
        </div>
        <div class="pic-titile-sub">
            얼굴 사진을 업로드하세요.
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
                <button class="pic-btn" v-on:click="fnTypeClick">적용한 사진 보기</button>
            </div>

            <div class="pic-btn-box">
                <button class="hair-btn" v-on:click="toggleHairOptions">Hair</button>
                <div class="hair-btn-container" v-if="hairOptionsVisible">
                    <button 
                        v-for="index in hairOptionCount"
                        :key="index"
                        class="hair-option-btn"
                        v-show="showHairOptions"
                        @click="handleHairOptionClick(index)"
                    >
                        Hair Option {{ index }}
                    </button>
                </div>
                <button class="lip-btn" v-on:click="fnLipClick">Lip</button>
            </div>
        </div>

    </div>

    
</template>

<script>
import { ref } from 'vue';

export default ({
    data(){
      return{
        hairOptionsVisible: false,
        hairOptionCount: 7,
        hairImagePath: 'E:\jm\AI\ai_workspace\face_makeup\color\hair'
      };  
    },
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
        fnUpClick(){

        },
        fnTypeClick(){

        },
        toggleHairOptions(){
           this.hairOptionsVisible = !this.hairOptionsVisible;
        },
        fnHairClick(){
            if (!this.hairButtonCreated){
                this.hairButtonCreated = true;
            }
        },
        handleHairOptionClick(index){
            // 각 버튼 클릭 시 동작하는 로직 추가
        },
        getHairImageUrl(index){
            return this.hairImagePath + 'hair-' + index + '.png';
        },
        fnLipClick(){

        }
    }
})
</script>

<style>
@import '@/assets/css/base_pic.css';

.pic-btn-box {
  display: flex;
  gap: 10px; /* 버튼들 사이의 간격을 조정합니다. */
}

.hair-btn {
  margin-right: 10px; /* Hair 버튼 오른쪽 여백을 조정합니다. */
  display: inline-block;
  padding: 10px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: 2px solid #ad578c;
  outline: none;
  cursor: pointer;
  text-align: center;
  width: 100px;
}

.lip-btn {
  margin-left: 10px; /* Lip 버튼 왼쪽 여백을 조정합니다. */
  display: inline-block;
  padding: 10px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: 2px solid #ad578c;
  outline: none;
  cursor: pointer;
  text-align: center;
  width: 100px;
}
</style>
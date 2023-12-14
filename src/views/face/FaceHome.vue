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
                <img class="my-img-box" @load="handleImageLoad" :src="imageUrl" v-if="imageUrl" 
                :style="{ display: imageUrl ? 'block' : 'none' }">
            
                <Loading  v-if="isLoading"/>
            </div>
            
            <div class="pic-btn-box">
                <!--<button class="pic-btn" v-on:click="fnUpClick">사진찍기</button>-->
                <button class="pic-btn" v-on:click="fnTypeClick" ref="result_btn">적용한 사진 보기</button>
            </div>

            <div class="pic-btn-box color-box-face">
                <!--
                <div>
                    <button class="hair-btn" v-on:click="toggleHairOptions">Hair</button>
                    <button class="lip-btn" v-on:click="fnLipClick">Lip</button>
                </div>
                -->
                <div class="sub-title">Hair color</div>
                <div>머리색을 선택해주세요.</div>
                <div class="hair-btn-container" v-if="hairOptionsVisible">
                    <button 
                        v-for="index in hairOptionCount"
                        :key="index"
                        class="hair-option-btn"
                        :class="hairNum == index ? 'active' : ''"
                        @click="handleHairOptionClick(index)"
                    >
                        <img :src="require(`@/assets/images/face/hair/hair${index}.jpg`)">
                    </button>
                </div>
                
                <div class="sub-title">Lip color</div>
                <div>입술색을 선택해주세요.</div>
                <div class="hair-btn-container" v-if="lipOptionsVisible">
                    <button 
                        v-for="index in lipOptionCount"
                        :key="index"
                        class="lip-option-btn"
                        :class="lipNum == index ? 'active' : ''"
                        @click="handleLipOptionClick(index)"
                    >
                        <img :src="require(`@/assets/images/face/lip/lip${index}.jpg`)">
                    </button>
                </div>
            </div>
        </div>

    </div>

    
</template>

<script>
import { ref } from 'vue';
import Loading from '@/views/common/Loading.vue';

export default ({
    components: {
        Loading
    },
    data(){
      return{
        isLoading: false,
        hairOptionsVisible: true,
        hairOptionCount: 7,
        hairImagePath: '../../src/assets/images/face/hair/',
        lipOptionsVisible: true,
        lipOptionCount: 8,
        hairColorList: [
            [14, 157, 204], [204, 157, 14], [120, 55, 80], [80, 55, 120], 
            [215, 232, 250], [32, 133, 205], [0, 0, 128]
        ],
        lipColorList: [
            [186, 186, 255], [123, 123, 255], [82, 82, 255], [205, 194, 255], 
            [172, 147, 255], [137, 98, 137], [104, 52, 255], [74, 8, 255]
        ],
        hairNum: null,
        lipNum: null,
        myHairList : [],
        myLipList : [],
        lipImagePath: '../../src/assets/images/face/lip/'
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
        callPythonApi(dir_path, org_path, image_path, hair, lip) {
            
            const apiUrl = 'http://localhost:4444/face';
            const requestBody = { 
                dir_path: dir_path,
                org_path: org_path,
                image_path: image_path,
                hair : hair,
                lip : lip
            };

            this.$axios.post(apiUrl, requestBody, {
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                console.log('callPythonApi res.data : ' + res.data);
                console.log('callPythonApi res.data str : ' +  JSON.stringify(res.data));
                //console.log('url_1 + res.data.change_path : ' +  ('/style/image/' + res.data.change_path));
                //const url = '../../allaboutu_springboot/src/main/resources/style_upload/';
                //this.imageUrl = 'http://localhost:2222/face/image/20231213162814_form.jpg'//
                
                const change_path = res.data.change_path;
                this.imageUrl = '/face/image/' + change_path;
                this.$refs.pic_label.style.display = 'none';
                this.$refs.result_btn.style.display = 'none';
                this.isLoading = false;
            })
            .catch(error => {
                //에러 처리
                console.error(error);
            });
            
        },
        fnTypeClick(){
            const token = sessionStorage.getItem('accessToken');
            console.log('token : ' + token);

            // if(token == null) {
            //     this.$router.push({
            //         path: '/login'
            //     })

            //     return;
            // }

            if(this.imageFile == null) {
                alert('사진을 업로드해주세요.');
                return;
            }

            this.isLoading = true;
            const formData = new FormData();
            console.log('this.imageFile : ' + this.imageFile);
            formData.append('file', this.imageFile);
            formData.append('userNum', this.tempUserNum);

            this.$axios.post('/face/upload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                alert('사진 등록 성공');
                console.log('res.data : ' + res.data);
                console.log('res stringify : ' + JSON.stringify(res))
                
                const hair = this.myHairList;
                const lip = this.myLipList;
                
                console.log('hair : ' + hair);
                //로딩 시작
                
                this.callPythonApi(res.data[0], res.data[1], res.data[2], hair, lip);
                
            })
            .catch(err => {
                alert('사진 등록 실패');
                console.log(err);
            })
        },
        toggleHairOptions(){
           this.hairOptionsVisible = !this.hairOptionsVisible;
        },
        toggleLipOptions(){
           this.lipOptionsVisible = !this.lipOptionsVisible;
        },
        fnHairClick(){
            if (!this.hairButtonCreated){
                this.hairButtonCreated = true;
            }
        },
        fnLipClick(){
            if (!this.lipButtonCreated){
                this.lipButtonCreated = true;
            }
        },
        handleHairOptionClick(index){
            // 각 버튼 클릭 시 동작하는 로직 추가
            console.log('index : ' + index);
            this.hairNum = index;
            this.myHairList = this.hairColorList[index-1]
        },
        handleLipOptionClick(index){
            // 각 버튼 클릭 시 동작하는 로직 추가
            console.log('index : ' + index);
            this.lipNum = index;
            this.myLipList = this.lipColorList[index-1]
        },
        getHairImageUrl(index){
            return require(this.hairImagePath + 'hair' + index + '.jpg');
        },
        getLipImageUrl(index){
            return require(this.lipImagePath + 'lip' + index + '.jpg');
        },
        handleImageLoad(data){
            
        },
        fnLipClick(){

        }
    }
})
</script>

<style scoped>
@import '@/assets/css/base_pic.css';

.pic-btn-box {
  display: flex;
  gap: 10px; /* 버튼들 사이의 간격을 조정합니다. */
}

.color-box-face {
    flex-direction: column;
    align-items: center;
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

.hair-btn-container {
    width: 500px;
}
.hair-option-btn img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 5px;
}

.hair-option-btn.active,.hair-option-btn:hover {
    opacity: .6;
}


.lip-option-btn img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 5px;
}
.lip-option-btn.active,.lip-option-btn:hover {
    opacity: .6;
}

.sub-title {
    font-size: 25px;
    font-weight: bold;
    line-height: 24px;
    
    margin-top: 20px;
}

</style>
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
                <Loading  v-if="isLoading"/>
            </div>
            
            <div class="pic-btn-box"> 
                <!--<button class="pic-btn" v-on:click="fnUpClick">사진찍기</button>-->
                <button class="pic-btn" v-on:click="fnTypeClick">퍼스널 컬러 타입 보기</button>
            </div>
        </div>

    </div>

    
</template>

<script>
import { ref } from 'vue';
import Loading from '@/views/common/Loading.vue';

export default {    
    components: {
        Loading,
    },
    emits: ['show-component'],
    data() {
        return {
            isLoading: false
            ,tempUserNum : 1
            ,orgFile: null
            ,personalNum: -1
        }
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
            handleFileUpload,
        };
    },
    
    methods: {
        personalChangeType(personalNum) { // 스플릿 해서 두번째 값
            switch (personalNum) {
                case 'Spring':
                    return 1;
                case 'Summer':
                    return 2;
                case 'Autumn':
                    return 3;
                case 'Winter':
                    return 4;
            }
        },
        callPythonApi(dir_path, org_path, image_path) {
            
            const apiUrl = 'http://localhost:4444/upload';
            const requestBody = { 
                dir_path: dir_path,
                org_path: org_path,
                image_path: image_path,
                personalNum: this.personalNum,
            };

            this.$axios.post(apiUrl, requestBody, {
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                console.log('callPythonApi res.data : ' + res.data);
                console.log('callPythonApi res.data str : ' +  JSON.stringify(res.data));
                console.log('url_1 + res.data.change_path : ' +  ('/personal/image/' + res.data.change_path));
                
                
                //this.imageUrl = '/personal/image/' + res.data.change_path;
                const ptype = res.data.result.pctype.split(' ')[1];
                this.personalNum = this.personalChangeType(ptype);

                const change_path = res.data.change_path;
                this.$personalType.num = this.personalNum;
                console.log('personalNum : ' + this.personalNum);
                this.$emit('show-component');

                console.log('API 호출 전 personalNum: ' + this.personalNum);
                //insert하기
                const insertData = {
                    userNum: this.tempUserNum,
                    personalImg: res.data.org_path,  // 회원이 업로드한 사진
                    personalReimg: res.data.change_path, // 회원이 업로드한 사진 이름 바꾼거
                    personalNum: this.personalNum
                };
                
                console.log('insertData : ' + JSON.stringify(insertData));
                console.log('userNum : ' + this.tempUserNum);
                console.log('personalImg : ' + res.data.org_path);
                console.log('personalReimg : ' + res.data.change_path);
                console.log('personalNum : ' + this.personalNum);

                this.$axios.post('/personal/insert', insertData, {
                    headers:{'Content-Type': 'application/json'}
                })
                .then(res => {
                    console.log('데이터베이스 저장 성공 res : ' + res.data)
                    this.imageUrl = '/personal/image/' + change_path;
                    this.$refs.pic_label.personal.display = 'none';
                })
                .catch(error => {
                    //에러 처리
                    console.error(error);
                    console.log("insert 실패");
                });
                
            })
            .catch(error => {
                //에러 처리
                console.error(error);
                console.log("api 요청안된다");
            });
            
        },
        fnTypeClick(){

            if(this.imageFile == null) {
                alert('사진을 업로드해주세요.');
                return;
            }

            const formData = new FormData();
            console.log('this.imageFile : ' + this.imageFile);
            formData.append('file', this.imageFile);
            formData.append('userNum', this.tempUserNum);

            console.log('this.tempUserNum : ' + this.tempUserNum);

            this.$axios.post('/personal/upload', formData, {
                    headers:{'Content-Type': 'multipart/form-data'}
                })
                .then(res => {
                    console.log('upload 성공 : ' + res.data);
                    this.isLoading = true;
                    this.callPythonApi(res.data[0], res.data[1], res.data[2]);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/base_pic.css';

</style>
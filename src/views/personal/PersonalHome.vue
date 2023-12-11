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
        Loading
    },
    emits: ['show-component'],
    data() {
        return {
            isLoading: false
            ,tempUserNum : 1
            ,orgFile: null
            ,type: -1
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
            handleFileUpload
        };
    },
    
    methods: {
        callPythonApi(dir_path, org_path, image_path) {
            
            const apiUrl = 'http://localhost:8080/api';
            const requestBody = { 
                dir_path: dir_path,
                org_path: org_path,
                image_path: image_path,
            };

            this.$axios.post(apiUrl, requestBody, {
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                console.log('callPythonApi res.data : ' + res.data);
                console.log('callPythonApi res.data str : ' +  JSON.stringify(res.data));
                console.log('url_1 + res.data.change_path : ' +  ('/personal/image/' + res.data.change_path));
                
                this.imageUrl = '/personal/image/' + res.data.change_path;
                this.type = res.data.type;
                const change_path = res.data.change_path;

                this.$personalType.num = this.type;
                console.log('type ' + this.type);
                this.$emit('show-component');

                //insert하기
                const insertData = {
                    user_num: -1,
                    personal_img: org_path,  // 회원이 업로드한 사진
                    personal_reimg: change_path, // 회원이 업로드한 사진 이름 바꾼거
                    personal_num: t023his.type // 번호
                }
                console.log('insertData : ' + JSON.stringify(insertData));
                
                this.$axios.post('http://localhost:2222/personal/insert', insertData, {
                    headers:{'Content-Type': 'application/json'}
                })
                .then(res => {
                    console.log('데이터베이스 저장 성공 res : ' + res.data)
                })
                .catch(error => {
                    //에러 처리
                    console.error(error);
                });
                
            })
            .catch(error => {
                //에러 처리
                console.error(error);
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

            this.$axios.post('/personal/upload', formData, {
                    headers:{'Content-Type': 'multipart/form-data'}
                })
                .then(res => {
                    console.log('디비 저장 성공 : ' + res.data);
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
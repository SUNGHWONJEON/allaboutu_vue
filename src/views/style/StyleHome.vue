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
                <input class="pic-img-box" type="file" id="pic_up"
                    @change="handleFileUpload" accept="image/*"
                >
                <img class="my-img-box" ref="img_box" @load="handleImageLoad"
                    :src="imageUrl" v-if="imageUrl" 
                    :style="{ display: imageUrl ? 'block' : 'none' }"
                >
                <img class="my-img-box" 
                    :src="newImageUrl"
                    :style="{ display: newImageUrl ? 'block' : 'none' }"
                >

                <Loading  v-if="isLoading"/>
            </div>
            
            <!--
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
                
                <div class="pic-input-div">
                    <span>허리 사이즈를 입력해주세요.</span>
                    <input type="number" @change="changeSize">
                </div>
                
            </div>-->

            <div class="pic-btn-box">
                <!--<button class="pic-btn" v-on:click="fnUpClick">사진찍기</button>-->
                <button class="pic-btn" v-on:click="fnTypeClick">치수보기</button>
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
            ,waistSize: -1
            ,type: -1
            ,newImageUrl : null
        }
    },
    setup() {
        const imageFile = ref(null);
        const imageUrl = ref(null);
        const imageUploaded = ref(false);

        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            imageFile.value = file;
            imageUrl.value = URL.createObjectURL(file);
            imageUploaded.value = true;
            console.log('imageUrl.value : ' + imageUrl.value);
            console.log('imageFile.value : ' + imageFile.value);
            console.log('file : ' + file);
            console.log('imageFile : ' + imageFile);
        };

        const changeSize = (e) => {
            this.waistSize = e.target.value
        }

        return {
            imageFile,
            imageUrl,
            imageUploaded,
            handleFileUpload,
            changeSize
        };
    },
    methods: {
        callPythonApi(dir_path, org_path, image_path, wsize) {
            
            const apiUrl = 'http://localhost:4444/api';
            const requestBody = { 
                dir_path: dir_path,
                org_path: org_path,
                image_path: image_path,
                wsize : wsize
            };

            this.$axios.post(apiUrl, requestBody, {
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                console.log('callPythonApi res.data : ' + res.data);
                console.log('callPythonApi res.data str : ' +  JSON.stringify(res.data));
                //console.log('url_1 + res.data.change_path : ' +  ('/style/image/' + res.data.change_path));
                //const url = '../../allaboutu_springboot/src/main/resources/style_upload/';
                //this.imageUrl = 'http://localhost:2222/style/image/20231206173103_form.jpg'//
                
                this.type = res.data.type;
                const change_path = res.data.change_path;
                
                this.$styleType.num = this.type;
                console.log('type ' + this.type);
                this.$emit('show-component');
                
                //insert하기
                const insertData = {
                    userNum: 1,
                    userImg: org_path,
                    userReimg: image_path,
                    userStyle: change_path,
                    formNum: this.type
                }
                console.log('insertData : ' + JSON.stringify(insertData));
                
                this.$axios.post('/style/insert', insertData, {
                    headers:{'Content-Type': 'application/json'}
                })
                .then(res => {
                    console.log('데이터베이스 저장 성공 res : ' + res.data)
                    this.imageUrl = '/style/image/' + change_path;
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

            this.$axios.post('/style/upload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                alert('사진 등록 성공');
                console.log('res.data : ' + res.data);
                console.log('res stringify : ' + JSON.stringify(res))
                console.log('waistSize : ' + this.waistSize)
                //로딩 시작
                this.isLoading = true;
                this.callPythonApi(res.data[0], res.data[1], res.data[2], this.waistSize);
                
            })
            .catch(err => {
                alert('게시글 등록 실패');
                console.log(err);
            })


        },
        handleImageLoad(data){
            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base_pic.scss';
</style>
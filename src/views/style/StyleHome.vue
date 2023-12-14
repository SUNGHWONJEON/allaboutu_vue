<template>
    <div class="pic-title-box">
        <div class="pic-titile">
            PHOTO
        </div>
        <div class="pic-titile-sub">
            전신 사진을 업로드하세요.
        </div>
    </div>
    
    <div class="pic-inputbox">
        <!--
        <div class="pic-input-div">
            <span>허리 사이즈를 입력해주세요.</span>
            <input type="number" @change="changeSize">
        </div>
        -->
        <div class="pic-cody-settitle">
            Cody set
        </div>
        <div class="pic-cody-settitle-sub">
            코디 셋을 하나 고르세요.
        </div>
        
        <div class="pic-cody-setbox">
            <button class="pic-cody-set-btn" 
                @mouseover="button_over(index)"
                @mouseout="button_out"
                @click="button_click(index)"
                :class="{active: codySet.active}"
                
                v-for="(codySet, index) in codySetList" :key="index"
            >
                <div class="pic-cody-set-item">
                    <img :src="codySet.top">
                </div>
                <div class="pic-cody-set-item">
                    <img :src="codySet.bottom">
                </div>
            </button>
        </div>
        
    </div>
    
    <div class="pic-box">
        <div class="pic-upload-box">
            
        </div>
        <div class="pic-btn-box">
            <button class="pic-btn" ref="result_btn"
                v-on:click="fnTypeClick">치수보기</button>
        </div>
    </div>

    <div class="pic-upload dropzone" 
        ref="drop_zone"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop($event)"
    >
        <label for="pic_up" ref="pic_label" :class="{ 'pic-label': imageUploaded}">업로드</label>
        <input class="pic-img-box" type="file" id="pic_up"
            @change="handleFileUpload" accept="image/*"
        >
        <img class="my-img-box" ref="img_box" @load="handleImageLoad"
            :src="imageUrl" v-if="imageUrl" 
            :style="{ display: imageUrl ? 'block' : 'block' }"
        >
        <img class="my-img-box" 
            :src="newImageUrl"
            :style="{ display: newImageUrl ? 'block' : 'none' }"
        >
        <img class="set-item-img" 
            ref="item_img" 
            :src="codyDrag.src"
            :data-id="codyDrag.id"
            v-for="codyDrag in codyDragList"
            :key="codyDrag.id"
            draggable="true"
            :style="{ display: itemVisible ? 'block' : 'none' }"
            @dragstart="handleDragStart($event, codyDrag.id)"
            @mousemove="handleDragOn($event)"

            
        >
        <!--:style="{
                width: codyDrag.width + 'px',
                height: codyDrag.height + 'px'
            }"-->
        <div class="drop-box" >

        </div>
        <Loading  v-if="isLoading"/>
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
    
    mounted() {
        //console.log('this.$refs.drop_zone.style.left : ' + this.$refs.drop_zone.offsetLeft);
        //console.log('this.$refs.drop_zone.style.top : ' + this.$refs.drop_zone.offsetTop);
        //this.refArray = this.codyDragList.map((item, index) => `myImage${index}`);
        //this.setItem();

    },
    data() {
        return {
            widthDrag: false,
            itemVisible: false,
            refArray: ['img_1', 'img_2'], // ref 값을 저장할 배열
            //imageUrl: '/style/image/20231214123623_form.jpg'
            //imageUrl: '/style/image/20231214120201_form.jpg'
            imageUrl: null
            ,isLoading: false
            ,tempUserNum : 1
            ,orgFile: null
            ,waistSize: -1
            ,type: 1
            ,keypoints: null
            ,newImageUrl : null
            ,myCodySetNum : -1
            ,codyDragList: [
                {
                    id: 1,
                    src: require('@/assets/images/cody/codyset_t_1.png'),
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false
                },
                {
                    id: 2,
                    src: require('@/assets/images/cody/codyset_b_1.png'),
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    isDragging: false
                }
            ]
            ,codySetList: [
                {
                    top: require('@/assets/images/cody/codyset_t_1.png'),
                    bottom: require('@/assets/images/cody/codyset_b_1.png'),
                    active: ''
                }
            ]
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

        return {
            imageFile,
            imageUrl,
            imageUploaded,
            handleFileUpload,
            //changeSize
        };
        
    },
    methods: {
        //드래그!!!
        handleDragStart(event, id) {
            // 드래그 시작 시 호출되는 이벤트 핸들러
            console.log('event.target.id : ' + id)
            event.dataTransfer.dropEffect = 'move'
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('itemId', id);

            if(this.widthDrag) {
                this.codyDragList[id-1].isDragging = true;
                this.dragStartX = event.clientX;
                this.dragStartY = event.clientY;
            }
            
        },
        handleDrop(event) {
            event.preventDefault();
            const itemId = event.dataTransfer.getData('itemId');
            //const dropX = event.clientX - this.$refs.drop_zone.style.left;
            //const dropY = event.clientY - this.$refs.drop_zone.style.top;
            const abTop = window.scrollY + this.$refs.drop_zone.getBoundingClientRect().top;
            const abLeft = this.$refs.drop_zone.getBoundingClientRect().left;
            console.log('abTop : ' + abTop);
            console.log('abTop : ' + abTop);
            console.log('abLeft : ' + abLeft);
            const dropX = event.clientX - abLeft - 50;
            const dropY = event.clientY - abTop - 50;
            const itemIndex = this.codyDragList.findIndex((item) => item.id === Number(itemId));
            
            for (const item of this.codyDragList) {
                item.isDragging = false;
            }

            if (itemIndex > -1) {
                console.log('itemIndex : ' + itemIndex);
                console.log('this.$refs.drop_zone.style.left : ' + this.$refs.drop_zone.offsetLeft);
                console.log('this.$refs.drop_zone.style.top : ' + this.$refs.drop_zone.offsetTop);
                console.log('dropX : ' + dropX);
                console.log('dropY : ' + dropY);
                
                this.codyDragList[itemIndex].x = dropX;
                this.codyDragList[itemIndex].y = dropY;

                this.codyDragList[itemIndex].width = 200 + 'px';
                this.codyDragList[itemIndex].height = 200 + 'px';

                const ref= this.$refs.item_img[itemIndex];
                ref.style.left = dropX + 'px';
                ref.style.top = dropY + 'px';
            }
            /*
            // 드래그 종료 시 호출되는 이벤트 핸들러
            const newIndex = event.target.dataset.id
            this.isDragging = false;
            const itemId = event.dataTransfer.getData('itemId');
            // 아이템이 드롭된 위치의 index를 찾습니다.
            const dropIndex = this.codyDragList.findIndex(item => item.id === itemId);
            const item = this.codyDragList.splice(dropIndex, 1)[0];// 아이템을 삭제합니다.
            this.codyDragList.splice(newIndex, 0, item);// 새로운 위치로 아이템을 삽입합니다.
            console.log('dropIndex : ' + dropIndex)
            console.log('newIndex : ' + newIndex)
            */
        },
        handleDragOver(event) {
            // 드래그된 요소가 드롭 가능한 영역 위에 있을 때 호출되는 이벤트 핸들러
            event.preventDefault();
        },
        handleDragEnter(event) {
            // 드래그된 요소가 드롭 가능한 영역에 진입했을 때 호출되는 이벤트 핸들러
            event.target.classList.add('highlight');
        },
        handleDragLeave(event) {
            // 드래그된 요소가 드롭 가능한 영역을 떠났을 때 호출되는 이벤트 핸들러
            event.target.classList.remove('highlight');
        },
        handleDragOn(event) {
            for (const item of this.codyDragList) {
                if (item.isDragging) {
                    console.log('??????')
                    console.log('handleDragOn item id : ' + item.id)
                    const deltaX = event.clientX - this.dragStartX;
                    const deltaY = event.clientY - this.dragStartY;
                    item.width += deltaX;
                    item.height += deltaY;
                    this.dragStartX = event.clientX;
                    this.dragStartY = event.clientY;
                }
            }
        },


        setItem(data){
            console.log('refArray : ' + this.refArray);
            let tempData = {}
            if(this.test) {
                tempData = {
                    hip_w:0.10021227598190308,
                    hip_x:0.43638134002685547,
                    hip_y:0.4036853313446045,
                    shoulder_w:0.1683144,
                    shoulder_x:0.39697796,
                    shoulder_y:0.2084634
                }
            }else{
                tempData = {
                    hip_w: data.hip_w,
                    hip_x: data.hip_x,
                    hip_y: data.hip_y,
                    shoulder_w: data.shoulder_w,
                    shoulder_x: data.shoulder_x,
                    shoulder_y: data.shoulder_y
                }
            }
            this.widthDrag = true;
            this.itemVisible = true;
            //this.imageUrl = '/style/image/20231214120201_form.jpg';
            const s_w = (tempData.shoulder_w*650).toFixed(5);
            const s_x = (tempData.shoulder_x*360).toFixed(5);
            const s_y = (tempData.shoulder_y*270).toFixed(5);
            console.log('s_w : ' + s_w)
            console.log('s_x : ' + s_x)
            console.log('s_y : ' + s_y)
            console.log('this.refArray : ' + this.refArray)
            const ref_1 = this.$refs.item_img[0];
            const ref_2 = this.$refs.item_img[1];
            console.log('ref_1 : ' + ref_1);
            ref_1.style.width = s_w + 'px';
            ref_1.style.height = 'auto';
            ref_1.style.left = s_x + 'px';
            ref_1.style.top = s_y + 'px';

            const h_w = (tempData.hip_w*920).toFixed(5);
            const h_x = (tempData.hip_x*320).toFixed(5);
            const h_y = (tempData.hip_y*340).toFixed(5);
            console.log('h_w : ' + h_w)
            console.log('h_x : ' + h_x)
            console.log('h_y : ' + h_y)
            ref_2.style.width = h_w + 'px';
            ref_2.style.height = 'auto';
            ref_2.style.left  = h_x + 'px';
            ref_2.style.top = h_y + 'px';
        },
        callPythonApi(dir_path, org_path, image_path) {
            
            const apiUrl = 'http://localhost:4444/api';
            const requestBody = { 
                dir_path: dir_path,
                org_path: org_path,
                image_path: image_path
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
                
                this.keypoints = res.data.keypoints;
                const change_path = res.data.change_path;
                
                this.$styleType.num = this.type;
                console.log('type ' + this.type);
                console.log('keypoints ' + this.keypoints);
                console.log('keypoints stringify ' + JSON.stringify(this.keypoints));
                this.$emit('show-component');
                
                this.setItem(this.keypoints);

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
                    this.$refs.pic_label.style.display = 'none';
                    this.$refs.result_btn.style.display = 'none';
                    
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
            
            const token = sessionStorage.getItem('accessToken');
            console.log('token : ' + token);

            if(token == null) {
                this.$router.push({
                    path: '/login'
                })

                return;
            }

            if(this.imageFile == null) {
                alert('사진을 업로드해주세요.');
                return;
            }
            console.log('this.myCodySetNum : ' + this.myCodySetNum);

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
                //로딩 시작
                this.isLoading = true;
                this.callPythonApi(res.data[0], res.data[1], res.data[2]);
                
            })
            .catch(err => {
                alert('게시글 등록 실패');
                console.log(err);
            })


        },
        handleImageLoad(data){
            this.isLoading = false;
        },
        changeSize(e) {
            this.waistSize = e.target.value;
            console.log('waistSize : ' + this.waistSize);
        },
        button_out(){
            this.codySetList.forEach(item => {
                item.active = '';
            });
        },
        button_over(index){
            console.log('index : ' + index)
            if(this.codySetList[index].active == 'active') return; 
            this.button_out();
            this.codySetList[index].active = 'active';
        },
        button_click(index){
            console.log('index : ' + index);
            this.codySetList[index].active = 'active';
            this.myCodySetNum = index+1;
            console.log('button_click this.myCodySetNum : ' + this.myCodySetNum);
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base_pic.scss';

.pic-img-box{
    display: none;
}
.set-item-img {
    position: absolute;
    z-index: 9999999;
}

.pic-upload label{
    display: block;
}

.pic-upload {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 180px;
    left: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.pic-inputbox {
    position: absolute;
    width: 300px;
    height: 400px;
    top: 180px;
    left: 520px;
    margin: 0px;
    padding: 10px;
}

.pic-box {
    .pic-upload-box{
        position: relative;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;

        
        .pic-btn-box {
            width: 48%;
            display: flex;
            margin-top: 15px;
            justify-content: center;
        }

        

        .drop-box {
            position: absolute;
            left: 500px;
            width: 500px;
            height: 500px;
            border: 1px solid #000;
        }
    }
}



</style>
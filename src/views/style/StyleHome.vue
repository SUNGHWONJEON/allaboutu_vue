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
        
    </div>
    <div class="pic-btn-box">
        <button class="pic-btn" ref="result_btn"
            v-on:click="fnTypeClick">치수보기</button>
        <button class="pic-btn codyinsert" ref="codyinsert_btn" v-if="isAdmin()" @click="fnCodyInsert">코디 입력</button>
    </div>
    <div class="dropzone-box">
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
            
            <div class="drop-box" >

            </div>
            <Loading  v-if="isLoading"/>



            <div class="myCody" v-for="codyDrag in codyDragList" :key="codyDrag"
            :style="{ 
                left: (codyDrag.x + 0) + 'px',
                top: (codyDrag.y + 0) + 'px',
                zIndex: codyDrag.zIndex,
                
                width: codyDrag.width + 'px',
                height: codyDrag.height + 'px',
            }"
            >   
                <div class="dragBar"
                    ref="drag_img"
                    :data-id="codyDrag.id"
                    :style="{ 
                        display: itemVisible ? 'block' : 'none',
                        width: (codyDrag.width + 20) + 'px',
                        height: 'calc(100% + 20px)'
                    }"
                    :draggable="true"
                    @dragstart="widthDdragDown($event)"
                    @drag="widthDdragOn($event)"
                    @dragend="widthDdragEnd($event)"
                >
                    <div class="line-box top-left-line"></div>
                    <div class="line-box top-right-line"></div>
                    <div class="line-box bottom-left-line"></div>
                    <div class="line-box bottom-right-line"></div>
                </div>

                <img class="set-item-img" 
                    ref="item_img" 
                    :src="codyDrag.id == 1 ? codySetList[myCodySetNum-1].top : codySetList[myCodySetNum-1].bottom"
                    :data-id="codyDrag.id"
                    :draggable="true"
                    
                    @dragstart="handleDragStart($event, codyDrag.id)"
                    :style="{ 
                        display: itemVisible ? 'block' : 'none'
                    }"
                >
            </div>
        </div>
    </div>
    
</template>

<script>
import { ref } from 'vue';
import Loading from '@/views/common/Loading.vue';

export default {
    computed: {
        dynamicHeight() {
            return (id) => {
                console.log('id : ' + id);
                return id === 1 ? 100 : 200;
            };
        }
    },
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
            barCount: 4,
            test: false,
            dragType: null,
            itemVisible: false,
            refArray: ['img_1', 'img_2'], // ref 값을 저장할 배열
            //imageUrl: 'http://localhost:2222/style/image/20231214191151_form.jpg'
            //imageUrl: '/style/image/20231214120201_form.jpg'
            imageUrl: null
            ,isLoading: false
            ,tempUserNum : 1
            ,orgFile: null
            ,waistSize: -1
            ,type: 1
            ,keypoints: null
            ,newImageUrl : null
            ,myCodySetNum : 1
            ,codyDragList: [
                {
                    id: 1,
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    zIndex: 99,
                    isDragging: false,
                    widthDragging: false
                },
                {
                    id: 2,
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    zIndex: 98,
                    isDragging: false,
                    widthDragging: false
                }
            ]
            ,codySetList: [
                {
                    top: require('@/assets/images/cody/codyset_t_1.png'),
                    bottom: require('@/assets/images/cody/codyset_b_1.png'),
                    active: ''
                },
                {
                    top: require('@/assets/images/cody/codyset_t_2.png'),
                    bottom: require('@/assets/images/cody/codyset_b_2.png'),
                    active: ''
                },
                {
                    top: require('@/assets/images/cody/codyset_t_3.png'),
                    bottom: require('@/assets/images/cody/codyset_b_3.png'),
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


            this.codyDragList[id-1].zIndex = this.codyDragList.reduce(
                (maxZIndex, item) => Math.max(maxZIndex, item.zIndex), 0) + 1;

            this.codyDragList[id-1].isDragging = true;
            
        },
        handleDrop(event) {
            event.preventDefault();
            this.allDraggingFirst();
            const itemId = event.dataTransfer.getData('itemId');
            //const dropX = event.clientX - this.$refs.drop_zone.style.left;
            //const dropY = event.clientY - this.$refs.drop_zone.style.top;
            //const abTop = window.scrollY + this.$refs.drop_zone.getBoundingClientRect().top;
            //const abLeft = this.$refs.drop_zone.getBoundingClientRect().left;
            console.log('this.$refs.drop_zone.getBoundingClientRect().top : ' + this.$refs.drop_zone.getBoundingClientRect().top);
            console.log('this.$refs.drop_zone.getBoundingClientRect().left : ' + this.$refs.drop_zone.getBoundingClientRect().left);
            //(document.body.offsetWidth - 900)/2 - 
            const abTop = window.scrollY + this.$refs.drop_zone.getBoundingClientRect().top;
            const abLeft = this.$refs.drop_zone.getBoundingClientRect().left;
            const dropX = event.clientX - 50  - abLeft;//-abTop//
            const dropY = event.clientY - 50  - abTop;//-abLeft//
            const itemIndex = this.codyDragList.findIndex((item) => item.id === Number(itemId));
            

            if (itemIndex > -1) {
                console.log('itemIndex : ' + itemIndex);
                console.log('this.$refs.drop_zone.style.left : ' + this.$refs.drop_zone.offsetLeft);
                console.log('this.$refs.drop_zone.style.top : ' + this.$refs.drop_zone.offsetTop);
                console.log('dropX : ' + dropX);
                console.log('dropY : ' + dropY);
                
                this.codyDragList[itemIndex].x = dropX //-100;
                this.codyDragList[itemIndex].y = dropY;

                //this.codyDragList[itemIndex].width = 200 + 'px';
                //this.codyDragList[itemIndex].height = 200 + 'px';

                
                //ref.style.left = dropX + 'px';
                //ref.style.top = dropY + 'px';
            }

            console.log('this.codyDragList : ' + JSON.stringify(this.codyDragList));
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
            event.preventDefault(); // 기본 동작 막기
            
        },
        handleDragEnter(event) {
            // 드래그된 요소가 드롭 가능한 영역에 진입했을 때 호출되는 이벤트 핸들러
            event.target.classList.add('highlight');
        },
        handleDragLeave(event) {
            // 드래그된 요소가 드롭 가능한 영역을 떠났을 때 호출되는 이벤트 핸들러
            event.target.classList.remove('highlight');
            
        },


        //마우스로 크기 늘리기
        widthDdragDown(event){
            const num = Number(event.target.getAttribute('data-id'));
            console.log('event.target.id : ' + event.target.getAttribute('data-id'))
            this.codyDragList[num-1].widthDragging = true;
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
            event.dataTransfer.setDragImage(new Image(), 0, 0);
            console.log('==================> dragStartX : ' + this.dragStartX);
        },
        widthDdragOn(event) {

            const num = Number(event.target.getAttribute('data-id'));
            const item = this.codyDragList[num-1];
            console.log('num : ' + num)
            console.log('item.widthDragging : ' + item.widthDragging)
            if (item.widthDragging) {
                console.log('this.dragStartXX 1 : ' + this.dragStartX);
                console.log('event.clientX : ' + event.clientX);
                const deltaX = event.clientX - this.dragStartX;
                const deltaY = event.clientY - this.dragStartY;
                console.log('deltaX : ' + deltaX);
                console.log('deltaY : ' + deltaY);
                item.width += deltaX;
                //item.height += deltaY;

                const ref_img = this.$refs.item_img[num-1];
                item.height = ref_img.height;
                console.log('======ref_img height : ' + ref_img.height)
                this.dragStartX = event.clientX;
                this.dragStartY = event.clientY;

                console.log('this.dragStartXX 2 : ' + this.dragStartX);
            }

        },
        widthDdragEnd(event){
            event.preventDefault(); // 기본 동작 막기
            this.allDraggingFirst();
            console.log('this.codyDragList : ' + JSON.stringify(this.codyDragList));
            
        },

        allDraggingFirst(){
            this.codyDragList.forEach(item => {
                item.widthDragging = false;
                item.isDragging = false;
            });

            this.dragStartX = null;
            this.dragStartY = null;
        },

        setItem(data, type){
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

            let s_w, s_x, s_y, h_w, h_x, h_y;
            if(type === 'click') {
                this.codyDragList.forEach(item => {
                    if(item.id == 1) {
                        s_w = item.width;
                        s_x = item.x;
                        s_y = item.y;
                    }else{
                        h_w = item.width;
                        h_x = item.x;
                        h_y = item.y;
                    }
                })
            }else{
                s_w = Math.floor(tempData.shoulder_w*600);
                s_x = Math.floor(tempData.shoulder_x*360);
                s_y = Math.floor(tempData.shoulder_y*300);
                h_w = Math.floor(tempData.hip_w*990);
                h_x = Math.floor(tempData.hip_x*340);
                h_y = Math.floor(tempData.hip_y*340);
            }

            this.itemVisible = true;
            //this.imageUrl = '/style/image/20231214120201_form.jpg';
            
            console.log('s_w : ' + s_w)
            console.log('s_x : ' + s_x)
            console.log('s_y : ' + s_y)
            console.log('this.refArray : ' + this.refArray)
            
            console.log('h_w : ' + h_w);
            console.log('h_x : ' + h_x);
            console.log('h_y : ' + h_y);
            const arr = [
                [s_w, s_x, s_y],
                [h_w, h_x, h_y]
            ]
            
            this.codyDragList.forEach(item => {
                item.width = arr[item.id-1][0];
                item.x = arr[item.id-1][1];
                item.y = arr[item.id-1][2];
                
                const per = item.width / this.$refs.item_img[item.id-1].width;
                item.height = this.$refs.item_img[item.id-1].height * per;
            })
            //비율계산

            

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

            //this.setItem();
            
            if(this.keypoints) {
                this.setItem(this.keypoints, 'click');
            }
        },
        fnCodyInsert(){
            this.$router.push({'path' : '/style/codyselect'});
            //console.log('this.$admin : ' + this.$admin);
        },
        isAdmin(){
            const userId = sessionStorage.getItem("userId")
            if(userId != null && userId.includes('admin')){
                return true
            }
            else {
                return false
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/base_pic.scss';

.dragBar {
    position: absolute;
    top: -10px;
    left: -10px;
    cursor: ne-resize;
}

.codyinsert {
    position: absolute;
    top: 601px;
    right: 80px;
    width: 150px;
    background: #ff6d6d;
    color: #fff;
}

$border-line : #969696;

.line-box {
    position: absolute;
    width: 10%;
    height: 10%;
}

.top-left-line {
    top: 0px;
    left: 0px;
    border-top: 1px solid $border-line;
    border-left: 1px solid $border-line;
}
.top-right-line {
    top: 0px;
    right: 0px;
    border-top: 1px solid $border-line;
    border-right: 1px solid $border-line;
}
.bottom-left-line {
    bottom: 0px;
    left: 0px;
    border-bottom: 1px solid $border-line;
    border-left: 1px solid $border-line;
}
.bottom-right-line {
    bottom: 0px;
    right: 0px;
    border-bottom: 1px solid $border-line;
    border-right: 1px solid $border-line;
}



.pic-img-box{
    display: none;
}
.set-item-img {
    position: absolute;
    width: 100%;
}

.pic-upload label{
    display: block;
}

.myCody {
    position: absolute;
    z-index: 9999999;
    cursor: pointer;
}

.dropzone-box {
    position: absolute;
    top: -40px;
    left: 0px;
    width: 100%;
}

.pic-upload {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 220px;
    left: calc(50% - 340px);
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

.pic-btn-box {
    margin: 0 auto;
    width: 48%;
    display: flex;
    margin-top: 15px;
    justify-content: center;
}



.pic-box {
    pointer-events: none;
    .pic-upload-box{
        position: relative;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        
        
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

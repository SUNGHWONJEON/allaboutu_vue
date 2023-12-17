<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">

                <div class="pic-titile">
                    Cody Insert
                </div>
                <div class="pic-titile-sub">
                    코디를 등록하세요.
                </div>

                <div class="cody-insert-box">
                    <div class="insert-title">코디 등록</div>
                    <table>
                        <tr>
                            <th class="table-td1">
                                항목명
                            </th>
                            <th>
                                내용
                            </th>
                        </tr>
                        <tr>
                            <td class="table-td1">
                                코디 제목
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="codyData.codyTitle" type="text" placeholder="코디 제목을 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                체형 번호 
                            </td>
                            <td>
                                <!-- formNum -->
                                <select v-model="codyData.formNum">
                                    <option v-for="form in formList" :key="form.id" :value="form.id">
                                        {{ form.text }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="table-td1">
                                코디 내용
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="codyData.codyContent" type="text" placeholder="코디 내용을 입력하세요."/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="table-td1">
                                모델이름
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="codyData.modelName" type="text" placeholder="모델 이름을 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                모델 키
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="codyData.modelHeight" type="text" placeholder="모델 키를 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                모델 몸무게
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="codyData.modelWeight" type="text" placeholder="모델 몸무게를 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                모델 이미지
                            </td>
                            <td>
                                <div class="selected-image" v-if="codyData.modelImgUrl">
                                    <img class="sel-img" :src="codyData.modelImgUrl"/>
                                    <img
                                        src="@/assets/images/community/delete_file.png"
                                        class="file-delete-btn"
                                        @click="removeModelImg()"
                                    />
                                </div>

                                <input
                                    type="file"
                                    id="upload-model"
                                    accept="image/*"
                                    @change="getFileNameModel($event.target.files)"
                                    multiple
                                    hidden
                                />
                                <label for="upload-model">
                                    <img
                                        src="@/assets/images/community/add_file.png"
                                        class="attach-btn"
                                        v-if="!codyData.modelImgUrl"
                                    />
                                </label>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                코디 이미지
                            </td>
                            <td>
                                <div
                                    v-for="(image, index) in selectedImages"
                                    :key="index"
                                    class="selected-image"
                                >
                                    <img class="sel-img" :src="image" alt="Selected Image" />
                                    <img
                                        src="@/assets/images/community/delete_file.png"
                                        class="file-delete-btn"
                                        @click="removeSelectedImage(index)"
                                    />
                                </div>
                                
                                <input
                                    type="file"
                                    id="upload-image"
                                    @change="getFileName($event.target.files)"
                                    accept="image/*"
                                    multiple
                                    hidden
                                />
                                <label for="upload-image">
                                    <img
                                        src="@/assets/images/community/add_file.png"
                                        class="attach-btn"
                                    />
                                </label>
                            </td>
                        </tr>

                    </table>
                    
                </div>


                <div class="cody-insert-box">
                    <div class="insert-title">코디 굿즈 등록</div>
                    <button class="plus-btn" @click="onPlus">더하기</button>
                    <table v-for="(item, index) in goodsList" :key="index">
                        <tr>
                            <th class="table-td1">
                                항목명
                            </th>
                            <th>
                                내용
                                <button class="minus-btn" @click="onMinus(index)">빼기</button>
                            </th>
                        </tr>
                        <tr>
                            <td class="table-td1">
                                상품 이름
                            </td>
                            <td>
                                <input class="input-box input-title"  v-model="item.name" type="text" placeholder="상품 이름을 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                브랜드 이름
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="item.brand" type="text" placeholder="브랜드 이름을 입력하세요."/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="table-td1">
                                상품 가격
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="item.price" type="text" placeholder="상품 가격을 입력하세요."/>
                            </td>
                        </tr>
                        
                        <tr>
                            <td class="table-td1">
                                상품착용치수
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="item.size" type="text" placeholder="상품착용치수를 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                상품링크
                            </td>
                            <td>
                                <input class="input-box input-title" v-model="item.link" type="text" placeholder="상품링크를 입력하세요."/>
                            </td>
                        </tr>

                        <tr>
                            <td class="table-td1">
                                상품 이미지
                            </td>
                            <td>
                                <div class="selected-image" v-if="item.goods_img_url">
                                    <img class="sel-img" :src="item.goods_img_url"/>
                                    <img
                                        src="@/assets/images/community/delete_file.png"
                                        class="file-delete-btn"
                                        @click="removeGoodsImg(index)"
                                    />
                                </div>

                                <input
                                    type="file"
                                    :id="'upload-goods'+index"
                                    accept="image/*"
                                    @change="getFileNameGoods(index, $event.target.files)"
                                    multiple
                                    hidden
                                />
                                <label :for="'upload-goods'+index">
                                    <img
                                        src="@/assets/images/community/add_file.png"
                                        class="attach-btn"
                                        v-if="!item.goods_img_url"
                                    />
                                </label>
                            </td>
                        </tr>


                    </table>
                    
                </div>

                <button class="insert-btn" @click="onSend">
                    등록하기
                </button>
            </div>
        </div>
    </div>
</template>
<script>

export default ({
    data() {
        return {
            formList: [
                {text: '1 역삼각형', id: 1},
                {text: '2 모래시계형', id: 2},
                {text: '3 사각체형', id: 3},
                {text: '4 둥근체형', id: 4},
                {text: '5 삼각체형', id: 5}
            ],
            codyData: {
                formNum: 1,
                codyTitle: '',
                codyContent: '',
                modelName: '',
                modelHeight: 0,
                modelWeight: 0,
                modelImg: null,
                modelImgUrl: null
            },
            goodsList: [],
            selectedImages: [],
            attachments: [],
        }
    },
    methods: {
        onSend(){
            
            console.log('this.attachments : ', JSON.stringify(this.attachments))
            console.log('this.attachments : ', JSON.stringify(this.attachments[0]))
            console.log('this.goodsList : ', JSON.stringify(this.goodsList))
            console.log('this.codyData : ', JSON.stringify(this.codyData))
            
            const cody = {
                formNum: this.codyData.formNum,
                codyTitle: this.codyData.codyTitle,
                codyContent: this.codyData.codyContent,
                modelName: this.codyData.modelName,
                modelHeight: this.codyData.modelHeight,
                modelWeight: this.codyData.modelWeight
            }

            let goods = [];
            let goodsAttachment = [];
            this.goodsList.forEach(item => {
                goods.push({
                    goodsName: item.name,
                    brandName: item.brand,
                    goodsPrice: item.price,
                    goodsSize: item.size,
                    goodsLink: item.link,
                })

                goodsAttachment.push(item.goods_img);

            });


            const sendData = new FormData();
            // sendData.append(
            //     "cody",
            //     new Blob([JSON.stringify(this.codyData)], { type: "application/json" })
            // );
            sendData.append("cody", new Blob([JSON.stringify(cody)], { type: "application/json" }));
            sendData.append("modelImg", this.codyData.modelImg);
            for (let i = 0; i < this.attachments.length; i++) {
                sendData.append("attachments", this.attachments[i]);
            }

            sendData.append("goods", new Blob([JSON.stringify(goods)], { type: "application/json" }));
            for (let i = 0; i < this.goodsList.length; i++) {
                sendData.append("goodsAttachment", this.goodsList[i].goods_img);
            }

            for (let key of sendData.keys()) {
                console.log('===' , key, ":", sendData.get(key));
            }

            this.$axios
            .post("/cody", sendData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                alert("게시글 등록 성공");
                
                // 게시글 등록 후 게시판 목록으로 이동
                this.$router.push("/style/codyselect");
            })
            .catch((err) => {
                alert("게시글 등록 실패");
                console.log(err);
            });
            
        },
        onPlus(){
            this.goodsList.push({
                name: '',
                brand: '',
                price: '',
                size: '',
                link: '',
                goods_img: null,
                goods_img_url: null,
            })
        },
        onMinus(index){
            this.goodsList.splice(index, 1);
        },
        getFileNameGoods(index, files){
            const item = this.goodsList[index];
            if(files[0]){
                item.goods_img = files[0];
                console.log('item.goods_img :' + item.goods_img)
                console.log('goods file : ' + files[0]);
                console.log('goods file : ' + URL.createObjectURL(files[0]));
                item.goods_img_url = URL.createObjectURL(files[0]);
            }
        },
        removeGoodsImg(index){
            this.goodsList[index].goods_img = null;
            this.goodsList[index].goods_img_url = null;
        },

        getFileNameModel(files) {
            if(files[0]){
                this.codyData.modelImg = files[0];
                console.log('file : ' + files[0]);
                console.log('file : ' + URL.createObjectURL(files[0]));
                this.codyData.modelImgUrl = URL.createObjectURL(files[0]);
            } 
        },
        removeModelImg(){
            this.codyData.modelImg = null;
            this.codyData.modelImgUrl = null;
        },
        removeSelectedImage(index) {
            // 이미지 클릭 시 이미지 삭제
            this.selectedImages.splice(index, 1);
            console.log('removeSelectedImage - this.attachments - before : ', this.attachments)
            this.attachments.splice(index, 1);
            console.log('removeSelectedImage - this.attachments - after : ', this.attachments)
        },
        getFileName(files) {
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    console.log('file : ' + file);
                    if (file.type.startsWith("image/")) {
                        // 이미지 파일이면 URL.createObjectURL을 사용하여 이미지를 표시
                        this.selectedImages.push(URL.createObjectURL(file));
                        console.log('????file : ' + JSON.stringify(file));
                        this.attachments.push(file);
                        console.log('????this.attachments : ' + this.attachments)
                    }
                }
            }
        },

    },
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/cody_insert.scss';

.insert-btn {
    position: absolute;
    left: calc(50% - 75px);

}
</style>

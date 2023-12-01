<template>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <div class="board-write-form">
                    <div class="category-section">
                        <div class="category-name">카테고리</div>
                        <label :for="category.id" v-for="category in categories" :key="category.id">
                            <input
                                type="radio"
                                :id="category.id"
                                :value="category.value"
                                v-model="selectedCategory"
                            />
                            {{ category.label }}
                        </label>
                        <div v-if="categoryWarning" class="warning-category">{{ categoryWarning }}</div>
                    </div>
                    <div class="board-input-section">
                        <div class="board-write-title">
                            <input type="text" v-model="title" maxlength="40" placeholder="제목을 입력하세요." required>
                            <div>{{ titleCount }} / {{ titleMaxLength }}</div>
                        </div>
                        <div class="board-write-content">
                            <textarea v-model="content" @input="checkMaxLength" placeholder="내용을 입력하세요." required></textarea>
                            <div>{{ contentCount }} / {{ contentMaxLength }}</div>
                            <img src="@/assets/images/community/camera.png" class="attach-btn" @click="openImageUploader">
                            <input type="file" @change="handleImageUpload" accept="image/*" ref="imageInput" multiple style="display: none;">
                        </div>
                        <div class="image-gallery" v-if="selectedImages.length > 0">
                            <div v-for="(image, index) in selectedImages" :key="index" class="selected-image">
                                <img :src="image" alt="Selected Image">
                                <button @click="removeSelectedImage(index)">Remove</button>
                            </div>
                        </div>
                        <div class="board-write-hashtags">
                            <div class="input-hashtag">
                                <input type="text" v-model="inputHashtag" placeholder="해시태그를 등록하세요." @keyup.enter="addHashtag">
                                <button @click="addHashtag">추가</button>
                                <div v-if="hashtagWarning" class="warning-hashtag">{{ hashtagWarning }}</div>
                            </div>
                            <div class="registered-hastags" v-if="registeredHashtags.length > 0">
                                <div v-for="hashtag in registeredHashtags" :key="hashtag">{{ '#' + hashtag }}</div>
                            </div>
                        </div>
                        <div class="register-btn-area">
                            <button @click="writeBoard()">등록하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../common/PageHeader.vue';
import PageFooter from '../common/PageFooter.vue';

export default {
    name: 'BoardWrite',
    components: { 
        PageHeader,
        PageFooter
    },
    data() {
        return {
            boardNum: null,
            selectedCategory: '',
            categories: [
                { id: 'daily', value: '3', label: '일상' },
                { id: 'beauty', value: '1', label: '뷰티' },
                { id: 'fashion', value: '2', label: '패션' },
            ],
            inputHashtag: '', // 입력한 해시태그
            registeredHashtags: [], // 등록된 해시태그 배열
            maxHashtags: 5, // 최대 해시태그 등록 개수
            hashtagWarning: '', // 해시태그 중복 경고메시지
            categoryWarning: '', // 카테고리 선택 경고메시지
            title: '',
            titleMaxLength: 40, // 제목 최대 글자수
            content: '',
            contentMaxLength: 500, // 내용 최대 글자수
            selectedImages: [],
            tempUserNum: 2, // 임시로 로그인한 유저 번호
        }
    },
    created() {
        if (this.$route.params.boardNum) {
            this.boardNum = this.$route.params.boardNum;
            this.getBoard(this.boardNum);
            console.log(this.$route.params.boardNum);
        }
    },
    computed: {
        titleCount() {
            return this.title.length;
        },
        contentCount() {
            return this.content.length;
        },
    },
    methods: {
        addHashtag() {
            const trimmedHashtag = this.inputHashtag.trim();
            if(trimmedHashtag !== '') {
                if(this.registeredHashtags.includes(trimmedHashtag)) {
                    this.hashtagWarning = '이미 등록된 해시태그입니다.';
                    setTimeout(() => {
                        this.hashtagWarning = '';
                    }, 3000);
                } else if(this.registeredHashtags.length >= this.maxHashtags) { // 해시태그가 최대 개수를 넘어갔는가?
                    this.hashtagWarning = '해시태그는 최대 5개까지 입력가능합니다.'
                } else {
                    this.registeredHashtags.push(this.inputHashtag.trim());
                    this.inputHashtag = '';
                    this.hashtagWarning = '';
                }
            }
        },
        writeBoard() {
            // 카테고리가 선택되지 않았을 경우
            if (!this.selectedCategory) {
                this.categoryWarning = '카테고리를 선택하세요.';
                setTimeout(() => {
                    this.categoryWarning = '';
                }, 3000);
                return;
            }

            this.$axios.post('/boards', {
                userNum: this.tempUserNum,
                categoryNum: this.selectedCategory,
                boardTitle: this.title,
                boardContent: this.content,
                hashtags: this.changeHashtagObject(this.registeredHashtags),
                images: this.selectedImages,
            })
            .then(res => {
                alert('게시글 등록 성공');

                // 게시글 등록 후 게시판 목록으로 이동
                this.$router.push('/board');
            })
            .catch(err => {
                alert('게시글 등록 실패');
                console.log(err);
            })
        },
        checkMaxLength() {
            if(this.content.length > this.contentMaxLength) {
                this.content = this.content.slice(0, this.contentMaxLength);
            }
        },
        openImageUploader() {
            // 파일 input 엘리먼트를 클릭하여 파일 업로드 창을 염
            this.$refs.imageInput.click();
        },
        handleImageUpload(event) {
            const files = event.target.files;

            if(files) {
                for(let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file.type.startsWith('image/')) {
                        // 이미지 파일이면 URL.createObjectURL을 사용하여 이미지를 표시
                        this.selectedImages.push(URL.createObjectURL(file));
                    }
                }
            }
        },
        removeSelectedImage(index) {
            // 이미지 클릭 시 이미지 삭제
            this.selectedImages.splice(index, 1);
        },
        getBoard(boardNum) {
            this.$axios.get('/boards/' + boardNum)
                .then(res => {
                    console.log(res.data);
                    this.title = res.data.boardTitle;
                    this.content = res.data.boardContent;
                    this.selectedCategory = res.data.categoryNum;
                    this.registeredHashtags = res.data.hashtags.length > 0 ? res.data.hashtags : [];
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeHashtagObject(registeredHashtags) {
            const hashtags = [];
            registeredHashtags.forEach(hashtag => {
                hashtags.push({ hashtag: hashtag });
            });
            return hashtags;
        }
    },
}
</script>

<style>
.category-section {
    border: 1px solid blue;
    width: 600px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.category-section div {
    display: inline-block;
    margin: 10px;
}

.category-section input[type=radio]{
    display: none;
}
.category-section label:has(input[type=radio]){
    display: inline-block;
    cursor: pointer;
    height: 24px;
    width: 90px;
    border: 1px solid #333;
    line-height: 24px;
    text-align: center;
    font-weight:bold;
    font-size:13px;
}
.category-section label:has(input[type=radio]){
    background-color: #fff;
    color: #333;
}
.category-section label:has(input[type=radio]:checked){
    background-color: #333;
    color: #fff;
}

.board-input-section {
    border: 1px solid blue;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.board-write-title input {
    border: 1px solid blue;
    border-radius: 10px;
    width: 550px;
    height: 40px;
    margin-top: 10px;
}
.board-write-title div {
    position: absolute;
    top: 157px;
    right: 340px;
    color: gray;
}

.board-write-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.board-write-content textarea {
    border: 1px solid blue;
    border-radius: 10px;
    width: 550px;
    height: 150px;
    margin-top: 10px;
}
.board-write-content div {
    position: absolute;
    top: 325px;
    right: 340px;
    color: gray;
}

.input-hashtag {
    border: 1px solid blue;
    width: 550px;
    height: 50px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.input-hashtag input {
    border: 1px solid gray;
    width: 500px;
    height: 40px;
    padding: 0;
}
.input-hashtag button {
    border: 1px solid gray;
    width: 50px;
    height: 40px;
}
.warning-hashtag {
    position: absolute;
    bottom: 135px;
    left: 22%;
    background-color: #ffcccc;
    padding: 5px;
    border: 1px solid #ff6666;
    border-radius: 5px;
    font-size: 12px;
}
.warning-category {
    position: absolute;
    top: 84px;
    left: 400px;
    background-color: #ffcccc;
    padding: 5px;
    border: 1px solid #ff6666;
    border-radius: 5px;
    font-size: 12px;
}

.registered-hastags {
    border: 1px solid blue;
    width: 550px;
    height: 50px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
.registered-hastags div {
    border: 1px solid blue;
    border-radius: 5px;
    width: auto;
    height: 20px;
    margin: 10px;
    padding: 5px;
}
.register-btn-area {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}
.register-btn-area button {
    border: 1px solid blue;
    margin-right: 25px;
    padding: 10px;
}

.attach-btn {
    position: absolute;
    top: 310px;
    left: 40px;
    width: 40px;
    color: gray;
}

.image-gallery {
    border: 1px solid blue;
    text-align: center;
    margin-top: 20px;
    width: 550px;
    height: 100px;
    display: flex;
    flex-direction: row;

}

.selected-image img {
    cursor: pointer;
    max-width: 100%;
    max-height: 100px;
}
</style>
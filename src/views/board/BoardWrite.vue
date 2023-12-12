<template>
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
                <input type="text" v-model="boardTitle" maxlength="40" placeholder="제목을 입력하세요." required>
                <div>{{ titleCount }} / {{ titleMaxLength }}</div>
            </div>
            <div class="board-write-content">
                <textarea v-model="boardContent" @input="checkMaxLength" placeholder="내용을 입력하세요." required></textarea>
                <div>{{ contentCount }} / {{ contentMaxLength }}</div>
            </div>
            <div class="image-gallery">
                <div v-for="(image, index) in selectedImages" :key="index" class="selected-image">
                    <img :src="image" alt="Selected Image">
                    <img src="@/assets/images/community/delete_file.png" class="file-delete-btn" @click="removeSelectedImage(index)">
                </div>
                <input type="file" id="upload-image" @change="getFileName($event.target.files)" accept="image/*" multiple hidden>
                <label for="upload-image">
                    <img src="@/assets/images/community/add_file.png" class="attach-btn">
                </label>
            </div>
            <div class="board-write-hashtags">
                <div class="input-hashtag">
                    <input type="text" v-model="inputHashtag" placeholder="해시태그를 등록하세요." @keyup.enter="addHashtag">
                    <button @click="addHashtag">추가</button>
                    <div v-if="hashtagWarning" class="warning-hashtag">{{ hashtagWarning }}</div>
                </div>
                <div class="registered-hashtags" v-if="registeredHashtags.length > 0">
                    <div v-for="hashtag in registeredHashtags" :key="hashtag">
                        <span @click="cancelRegistration(hashtag)">{{ '#' + hashtag }}</span>
                    </div>
                </div>
            </div>
            <div class="register-btn-area">
                <button v-if="boardNum == null" @click="writeBoard()">글 등록</button>
                <button v-else @click="updateBoard()">글 수정</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardWrite',
    components: { 
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
            boardTitle: '', // 게시글 제목
            boardContent: '', // 게시글 내용
            titleMaxLength: 40, // 제목 최대 글자수
            contentMaxLength: 500, // 내용 최대 글자수
            selectedImages: [],
            attachments: [],
            loginUserId: '',
        }
    },
    created() {
        if (this.$route.params.boardNum) {
            this.boardNum = this.$route.params.boardNum;
            this.getBoard(this.boardNum);
        }

        this.loginUserId = sessionStorage.getItem("userId");
    },
    computed: {
        titleCount() {
            return this.boardTitle.length;
        },
        contentCount() {
            return this.boardContent.length;
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

            const sendData = new FormData();
            const board = {
                writer: {
                    userId: this.loginUserId,
                },
                categoryNum: this.selectedCategory,
                boardTitle: this.boardTitle,
                boardContent: this.boardContent,
            };
            sendData.append('board', new Blob([JSON.stringify(board)], { type: 'application/json' }));
            sendData.append('hashtags', new Blob([JSON.stringify(this.registeredHashtags)], { type: 'application/json' }));
            for (let i = 0; i < this.attachments.length; i++) {
                sendData.append('attachments', this.attachments[i]);
            }

            this.$axios.post('/boards', sendData, {
                header: {
                    'Context-Type': 'multipart/form-data',
                }
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
        updateBoard() {
            // 카테고리가 선택되지 않았을 경우
            if (!this.selectedCategory) {
                this.categoryWarning = '카테고리를 선택하세요.';
                setTimeout(() => {
                    this.categoryWarning = '';
                }, 3000);
                return;
            }

            const sendData = new FormData();
            const board = {
                boardNum: this.boardNum,
                boardTitle: this.boardTitle,
                boardContent: this.boardContent,
            };
            sendData.append('board', new Blob([JSON.stringify(board)], { type: 'application/json' }));
            sendData.append('hashtags', new Blob([JSON.stringify(this.registeredHashtags)], { type: 'application/json' }));
            for (let i = 0; i < this.attachments.length; i++) {
                sendData.append('attachments', this.attachments[i]);
            }

            this.$axios.patch('/boards/' + this.boardNum, sendData, {
                header: {
                    'Context-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                alert('게시글 수정 성공');

                // 게시글 수정 후 게시판 목록으로 이동
                this.$router.push('/board');
            })
            .catch(err => {
                alert('게시글 수정 실패');
                console.log(err);
            })
        },
        checkMaxLength() {
            if(this.boardContent.length > this.contentMaxLength) {
                this.boardContent = this.boardContent.slice(0, this.contentMaxLength);
            }
        },
        getFileName(files) {
            if(files) {
                for(let i = 0; i < files.length; i++) {
                    const file = files[i];
                    if (file.type.startsWith('image/')) {
                        // 이미지 파일이면 URL.createObjectURL을 사용하여 이미지를 표시
                        this.selectedImages.push(URL.createObjectURL(file));
                        this.attachments.push(file);
                    }
                }
            }
        },
        removeSelectedImage(index) {
            // 이미지 클릭 시 이미지 삭제
            this.selectedImages.splice(index, 1);
            this.attachments.splice(index, 1);
        },
        getBoard(boardNum) {
            this.$axios.get('/boards/' + boardNum)
                .then(res => {
                    const board = res.data;
                    this.boardTitle = board.boardTitle;
                    this.boardContent = board.boardContent;
                    this.selectedCategory = board.categoryNum;
                    
                    // 해시태그 정보 담기
                    if(board.hashtags && board.hashtags.length > 0) {
                        board.hashtags.forEach(hashtag => {
                            this.registeredHashtags.push(hashtag.hashtag);
                        });
                    } else {
                        this.registeredHashtags = [];
                    }

                    this.attachments = board.attachments.length > 0 ? board.attachments : [];
                    
                    this.selectedImages = [];
                    for (let i = 0; i < this.attachments.length; i++) {
                        const attachment = this.attachments[i];
                        this.$axios.get('/boards/image/' + attachment.renameFileName, {
                            responseType: 'arraybuffer',
                        })
                        .then(res => {
                            const blob = new Blob([res.data]);
                            const imageUrl = URL.createObjectURL(blob);
                            this.selectedImages.push(imageUrl);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeHashtagObject(registeredHashtags) {
            const hashtags = [];
            registeredHashtags.forEach(hashtag => {
                hashtags.push({
                    hashtagNum: null,
                    hashtag: hashtag
                });
            });
            return hashtags;
        },
        cancelRegistration(hashtag) {
            // 클릭한 해시태그를 목록에서 제거
            const index = this.registeredHashtags.indexOf(hashtag);
            this.registeredHashtags.splice(index, 1);
        }
    },
}
</script>

<style scoped>
.board-write-form {
    border: 1px solid #e2e2e2;
    border-radius: 15px;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}
.category-section {
    width: 600px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    border: 1px solid #e2e2e2;
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
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.board-write-title input {
    border-radius: 10px;
    width: 550px;
    height: 40px;
    margin-top: 10px;
    padding: 10px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
}
.board-write-title div {
    position: relative;
    top: calc(0% - 30px);
    right: calc(-50% + 30px);
    color: gray;
}

.board-write-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.board-write-content textarea {
    border-radius: 10px;
    width: 550px;
    height: 150px;
    padding: 10px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
}
.board-write-content div {
    position: relative;
    top: calc(0% - 30px);
    right: calc(-89%);
    color: gray;
}

.input-hashtag {
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    width: 550px;
    height: 50px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 15px;
}
.input-hashtag input {
    width: 500px;
    height: 40px;
    padding: 0;
}
.input-hashtag button {
    border: 1px solid #e2e2e2; /* #ffdede */
    border-radius: 3px;
    background: #eeeeee; /* #ffe9e9 */
    width: 50px;
    height: 30px;
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

.registered-hashtags {
    border: 1px solid #e2e2e2;
    width: 550px;
    height: 50px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
.registered-hashtags div {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    width: auto;
    height: 30px;
    margin: 10px;
    padding: 5px;
    cursor: pointer;
}
.register-btn-area {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 10px;
}
.register-btn-area button {
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    background: #eeeeee;
    margin-right: 25px;
    padding: 10px;
}

.attach-btn {
    width: 50px;
    margin: 10px;
    cursor: pointer;
}

.image-gallery {
    border: 1px solid #e2e2e2;
    text-align: center;
    width: 550px;
    height: 120px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.selected-image img {
    cursor: pointer;
    max-width: 100%;
    max-height: 100px;
    margin: 10px;
    border-radius: 10px;
}
.image-gallery .file-delete-btn {
    position: relative;
    top: calc(-90px);
    left: calc(-30px);
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0px;
}
</style>
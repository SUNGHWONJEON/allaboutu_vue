<template>
    <PageHeader />
    
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
                    </div>
                    <div class="board-write-title">
                        제목 영역
                    </div>
                    <div class="board-write-content">
                        내용 영역
                    </div>
                    <div class="board-write-hashtags">
                        <div class="input-hashtag">
                            해시태그 입력
                        </div>
                        <div class="hastags">
                            입력한 해시태그
                        </div>
                    </div>
                    <div>
                        등록하기 버튼 영역
                        <button @click="writeBoard()">등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <PageFooter />
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
            selectedCategory: '',
            categories: [
                { id: 'daily', value: 'daily', label: '일상' },
                { id: 'beauty', value: 'beauty', label: '뷰티' },
                { id: 'fashion', value: 'fashion', label: '패션' },
            ]
        }
    },
}
</script>

<style>
.category-section {
    border: 1px solid blue;
    width: 600px;
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
</style>
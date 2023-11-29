<template>
    <PageHeader />
    
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
                <div class="board-write-form">
                    <div class="category-section">
                        카테고리
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
    }
}
</script>

<style>
    
</style>
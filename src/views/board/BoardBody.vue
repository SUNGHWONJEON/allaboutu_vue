<template>
    <div class="title-section">
        <div class="board-category">
            카테고리
        </div>
        <div class="board-title">
            제목
        </div>
        <div class="board-date">
            23. 11. 27
        </div>
    </div>
    <div class="board-content">
        내용 영역
    </div>
</template>
<script>
export default {
    name: 'BoardBody',
}
</script>
<style>
.title-section {
    border: 1px solid blue;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 30px;
}

.board-category {
    border: 1px solid violet;
    width: 10%;
}

.board-title {
    border: 1px solid violet;
    width: 75%;
    text-align: left;
}

.board-date {
    border: 1px solid violet;
    width: 15%;
}

.board-content {
    border: 1px solid blue;
    height: 150px;
}
</style>
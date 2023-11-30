<template>
    <div class="content">
        <table>
            <caption class="table-caption">게시판 목록</caption>
            <tr>
                <th>게시번호</th>
                <th>신고번호</th>
                <th>사유</th>
                <th>상세설명</th>
                <th>게시글삭제</th>
                <th>제한횟수</th>
                <th>로그인제한</th>
                <th>완료</th>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>
                    <button class="delete-btn" @click="confirmDelete">삭제</button>
                </td>
                <td>
                    <select>
                        <option value="0">0일</option>
                        <option value="3">3일</option>
                        <option value="7">7일</option>
                        <option value="영구정지">영구정지</option>
                    </select> 
                </td>
                <td><input type="submit" value="완료"></td>
            </tr>
        </table>
    </div>
    <div class="page-btn">
        <button>[맨처음]</button>&nbsp;
        <button>[이전그룹]</button>&nbsp;
        <button>1 2 3 4 5</button>&nbsp;
        <button>[다음그룹]</button>&nbsp;
        <button>[맨뒤]</button>&nbsp;
    </div>
</template>

<script>
export default {
    methods: {
        confirmDelete() {
        if (confirm("게시글을 삭제하시겠습니까?")) {

            console.log("게시글 삭제 수행");
        } else {
            console.log("삭제 취소");
        }
        },
    },
    
};
</script>
<style>
.content {
    display: flex;
    justify-content: center;
}
.delete-btn {
    background-color: #ff0000; /* 적절한 색상으로 변경 가능 */
    color: #fff; /* 텍스트 색상을 밝게 설정 */
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
th, td {
    border: 1px solid black;
    width: 100px;
    text-align: center;
    height: 25px;
}
th {
    background-color: rgb(215, 212, 212);
}
.admin-main {
    display: flex;
}
.table-caption {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
}

</style>
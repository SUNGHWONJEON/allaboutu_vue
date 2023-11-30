<template>
    <div class="content">
        <table>
            <caption class="table-caption">회원 목록</caption>
            <tr>
                <th>아이디</th>
                <th>이메일</th>
                <th>핸드폰 번호</th>
                <th>가입일</th>
                <th>상태</th>
                <th>제한횟수</th>
                <th>로그인제한</th>
                <th>완료</th>
            </tr>
            <tr v-for="(member, index) in members" :key="index">
                <td>{{ member.userId }}</td>
                <td>{{ member.userEmail }}</td>
                <td>{{ member.userPhone }}</td>
                <td>{{ member.enrolleDate }}</td>
                <td>제재</td>
                <td>2</td>
                <td>
                    <select>
                        <option value="0">0일</option>
                        <option value="3">3일</option>
                        <option value="7">7일</option>
                        <option value="영구정지">영구정지</option>
                    </select> 
                </td>
                <td><input type="button" value="완료"></td>
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
export default ({
    name: 'memberList',
    data() {
        return {
            members: [],
        }
    },
    mounted(){
        this.$axios.get('/members')
        .then((res) => {
            this.members = res.data
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        });
    },
})
</script>
<style>
.content {
    display: flex;
    justify-content: center;
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
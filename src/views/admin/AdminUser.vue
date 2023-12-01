<template>
    <div class="content">
        <div class="pic-titile">
                MEMBER
            </div>
            <div class="pic-titile-sub">
                회원 목록
            </div>
        <table>
            <tr>
                <th class="th">아이디</th>
                <th class="th">이메일</th>
                <th class="th">핸드폰 번호</th>
                <th class="th">가입일</th>
                <th class="th">상태</th>
                <th class="th">제한횟수</th>
                <th class="th">로그인제한</th>
                <th class="th">완료</th>
            </tr>
            <tr v-for="(member, index) in members" :key="index">
                <td>{{ member.userId }}</td>
                <td>{{ member.userEmail }}</td>
                <td>{{ member.userPhone }}</td>
                <td>{{ member.enrolleDate }}</td>
                <td>{{ member.account }}</td>
                <td>{{ member.reportCount }}</td>
                <td>
                    <select v-model="member.selectedValue">
                        <option value="0">0일</option>
                        <option value="3">3일</option>
                        <option value="7">7일</option>
                        <option value="영구정지">영구정지</option>
                    </select> 
                </td>
                <td><input type="button" value="완료" @click="completeAction(index)"></td>
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
    methods: {
        completeAction(index) {
            const selectedValue = this.members[index].selectedValue;
        }
    },
    mounted() {
        this.$axios.get('/admin')
            .then((res) => {
                this.members = res.data.content;
                this.totalPages = res.data.totalPages;
            }).catch((err) => {
                console.log(err);
            });
    },
    // mounted() {
    // this.fetchAdmin();
//   },
})
</script>
<style>

table {
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 5%;
}
th, td {
    border: 1px solid black;
    white-space: nowrap;
    text-align: center;
    height: 25px;
}
.th {
    background-color: #f5f5f5;
    font-weight: bold;
    color: #333;
}
.admin-main {
    display: flex;
}
.table-caption {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
}
.page-btn {
    margin-top: 20px;
}

</style>
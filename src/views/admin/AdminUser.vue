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
                <th class="th">회원번호</th>
                <th class="th">아이디</th>
                <th class="th">이메일</th>
                <th class="th">핸드폰 번호</th>
                <th class="th">가입일</th>
                <th class="th">상태</th>
                <th class="th">제한횟수</th>
            </tr>
            <tr v-for="(member, index) in members" :key="index">
                <td>{{ member.userNum }}</td>
                <td>{{ member.userId }}</td>
                <td>{{ member.userEmail }}</td>
                <td>{{ member.userPhone }}</td>
                <td>{{ member.enrolleDate }}</td>
                <td>
                    <input type="radio" v-model="member.account" :value="'Y'" :id="'statusYes' + index" @change="updateMemberAccount(member, 'Y')" />
                    <label>제한O</label>
                    <input type="radio" v-model="member.account" :value="'N'" :id="'statusNo' + index" @change="updateMemberAccount(member, 'N')"/>
                    <label>제한X</label>
                </td>
                <td>{{ member.reportCount }}</td>
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
import { getModernWebpackImporter } from 'sass-loader/dist/utils';

export default ({
    name: 'memberList',
    data() {
        return {
            members: [],
        }
    },
    methods: {
        updateMemberAccount(member){
            console.log(member.userNum);
            this.$axios.patch(`/member/${member.userNum}`, {
                account: member.account,
            })
            .then((res) => {
                console.log("제한되거나 풀림", res.data);
                this.members = res.date;
                const updateMember = this.members.map((m) => {
                    if (m.userNum === member.userNum){

                        return res.data;
                    }else{
                        return m;
                    }
                });
                this.members = updateMember;
            })
            .catch((err) => {
                    console.log(err);
                    
            });
        },
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
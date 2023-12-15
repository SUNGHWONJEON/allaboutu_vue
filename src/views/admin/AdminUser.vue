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
            </tr>
            <tr v-for="(member, index) in displayedPosts" :key="index">
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
            </tr>
        </table>
    </div>
    <div class="page-btn">
        <button @click="prevPage" :disabled="currentPage === 1">[이전페이지]</button>
        <template v-for="page in totalPages" :key="page">
            <button @click="goToPage(page)" :class="{ 'active-page': currentPage === page }" class="page-number">{{ page }}</button>
        </template>
        <button @click="nextPage" :disabled="currentPage === totalPages">[다음페이지]</button>
    </div>
</template>

<script>

export default ({
    name: 'memberList',
    data() {
        return {
            members: [], // 회원 목록 데이터
            currentPage: 1, // 현재 페이지 번호
            postsPerPage: 10, // 한 페이지에 보여줄 게시글의 수
        };
    },
    computed: {
        displayedPosts(){
            const sortedMembers = this.members.slice().sort((a, b) => b.userNum - a.userNum);

            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            return sortedMembers.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.members.length / this.postsPerPage);
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
            goToPage(page) {
            this.currentPage = page;
        },
        updateMemberAccount(member, status){
            console.log(member.userNum);
            this.$axios.patch(`/member/${member.userNum}`, {
                account: status,
            })
            .then((res) => {
                this.members = res.data;
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
        this.$axios.get('/admin/get')
            .then((res) => {
                this.members = res.data;
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
.page-number {
  margin-right: 5px;
  margin-left: 5px;
}
.active-page {
  font-weight: bold;
}

</style>
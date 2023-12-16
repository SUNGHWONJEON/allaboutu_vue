<template>
    <div class="content">
        <div class="pic-titile">
                BOARD
            </div>
            <div class="pic-titile-sub">
                게시글 목록
            </div>
        <table>
            <tr>
                <th class="th">게시번호</th>
                <th class="th">신고번호</th>
                <th class="th">사유</th>
                <th class="th">상세설명</th>
                <th class="th">게시글삭제일</th>
                <th class="th">게시글삭제</th>
            </tr>
                <tr v-for="(report, index) in displayedPosts" :key="index">
                    <td>
                        <router-link :to="'/board/' + report.boardNum">
                            <span>{{ report.boardNum }}</span>
                        </router-link>
                    </td>
                        <td>{{ report.reportNum }}</td>
                        <td>{{ report.reportCause }}</td>
                        <td>{{ report.reportReason }}</td>
                        <td>{{ report.deleteDate }}</td>
            
                    <td>
                        <button class="delete-btn" @click="confirmDelete(report)">삭제</button>
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

export default {
    name: 'reports',
    data() {
        return {
            reports: [],
            selectedReport: null,
            currentPage: 1, // 현재 페이지 번호
            postsPerPage: 10, // 한 페이지에 보여줄 게시글의 수
        }
    },
    computed: {
        displayedPosts(){
            // 정렬 해주는 코드
            const sortedBoards = this.reports.slice().sort((a, b) => b.reportNum - a.reportNum);

            const startIndex = (this.currentPage - 1) * this.postsPerPage;
            const endIndex = startIndex + this.postsPerPage;
            return sortedBoards.slice(startIndex, endIndex);
        },
        totalPages() {
            // 총 페이지 수 계산하는 computed 속성!
            return Math.ceil(this.reports.length / this.postsPerPage);
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
        confirmDelete(report) {
            console.log(report.reportNum);
            if (confirm("게시글을 신고 처리 하시겠습니까?")) {
                this.$axios.patch(`/reports/${report.reportNum}`)
                .then(() => {
                    console.log("게시글 신고 처리 성공");
                    //this.reports = this.reports.filter(r => r.boardNum !== report.boardNum);
                    this.reports = this.reports.filter(r => r.deleteDate != null);
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                console.log("삭제 취소");
            } 
        },
    },
    mounted() {
        this.$axios.get('/reports')
        .then((res) => {
            this.reports = res.data;
        }).catch((err) => {
            console.log(err);
        });
    },
    
};
</script>
<style>
.content {
    display: grid;
}
.delete-btn {
    background-color: #f9f9f9;
    color: #f86c6c;
    border: 1px solid #f86c6c;;
    padding: 4px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
}
.delete-btn:hover  {
    background-color: #f45a5a;
    color: #fff;

}
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
    background-color: rgb(247, 208, 247);
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
.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
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
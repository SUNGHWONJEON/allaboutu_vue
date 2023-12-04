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
                <th class="th">게시글삭제</th>
                <!-- <th class="th">로그인제한여부</th> -->
                <th class="th">완료</th>
            </tr>
            <tr v-for="(report, index) in reports" :key="index" @click="showDetail(report)">
                <td>{{ report.boardNum }}</td>
                <td>{{ report.reportNum }}</td>
                <td>{{ report.reportCause }}</td>
                <td>{{ report.reportReason }}</td>
                <td>
                    <button class="delete-btn" @click="confirmDelete(report)">삭제</button>
                </td>
                <!-- <td>
                    <v-if></v-if>
                </td> -->
                <td><input type="submit" value="완료"></td>
            </tr>
            <div v-if="selectedReport" class="popup">
                <div class="popup-content">
                    <span class="close" @click="closePopup">&times;</span>
                    <h2>{{ selectedReport.boardTitle }}</h2>
                    <p>{{ selectedReport.boardContent }}</p>
                </div>
            </div>
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
    name: 'reports',
    data() {
        return {
            reports: [],
            selectedReport: null,
        }
    },
    methods: {
        showDetail(report){
            this.selectedReport = {
                boardTitle: report.boardTitle,
                boardContent: report.boardContent,
            };
            this.$axios.get(`reports/${report.boardNum}`)
            .then((res) => {
                this.reports = res.data.content;
            })
            .catch((err) => {
                    console.log(err);
            });
            document.body.style.overflow = "hidden";
        },
        closePopup(){
            this.selectedReport = null;
            document.body.style.overflow = "";
        },
        confirmDelete(report) {
            console.log(report.boardNum);
            if (confirm("게시글을 신고 처리 하시겠습니까?")) {
                this.$axios.put(`/reports/${report.boardNum}`)
                .then(() => {
                    console.log("게시글 삭제 성공");
                    this.reports = this.reports.filter(r => r.boardNum !== report.boardNum);
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
            this.reports = res.data.content;
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

</style>
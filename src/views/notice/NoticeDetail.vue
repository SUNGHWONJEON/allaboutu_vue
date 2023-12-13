<template>
  <div class="notice-container">
    <div class="notice-header">
       <h2 id="noticesub">공지사항</h2>
      <table class="tg">
        <thead>
          <tr>
            <th class="tg-0lax border-leftnone">
              <h4>제목</h4>
            </th>
            <th class="tg-0lax border-rightnone" colspan="3">
              <span>{{ noticeTitle }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0lax border-leftnone"><h4>등록일</h4></td>
            <td class="tg-0lax">{{ writeDate }}</td>
            <td class="tg-0lax"><h4>조회 수</h4></td>
            <td class="tg-0lax border-rightnone">{{ readCount }}</td>
          </tr>
          <tr>
            <td class="tg-0lax border-leftnone"><h4>첨부파일</h4></td>
            <td class="tg-0lax border-rightnone" colspan="3">
              <span v-if="renameFileName"
                >{{ originalFileName }}
                <button @click="downloadFile">다운로드</button>
              </span>
              <span v-else>첨부파일 없음</span>
            </td>
          </tr>
          <tr>
            <td
              class="tg-0lax border-leftnone border-rightnone border-downnone"
              colspan="4"
            >
              <div class="notice-content-container">
                {{ noticeContents }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="notice-meta">
      <p></p>
      <span class="redate"></span>
    </div>

    <div id="attachment">
      <h4 class="attach"></h4>
      <span></span>
    </div>

    <div id="button-group">
      <router-link :to="'/notice/update/' + noticeNum">
        <input
          type="button"
          class="up"
          value="공지 수정 페이지로 이동"
        /> 
      </router-link> 
      <!-- <router-link v-if="userId.includes('admin')" :to="'/notice/update/' + noticeNum">
      <input type="button" class="up" value="공지 수정 페이지로 이동" />
    </router-link>

    <input
      type="button"
      class="del"
      @click="deleteNotice(noticeNum)"
      v-if="userId.includes('admin')"
      value="공지 글 삭제"
    /> -->

     <input
        type="button"
        class="del"
        @click="deleteNotice(noticeNum)"
        value="공지 글 삭제"
      /> -
      <input type="button" class="can" @click="goBack" value="목록" />
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "NoticeDetail",
  data() {
    return {
      noticeTitle: "",
      noticeContents: "",
      writeDate: "",
      readCount: "",
      originalFileName: "",
      renameFileName: "",
      noticeNum: "",
    };
  },
  mounted() {
    this.noticeNum = this.$route.params.noticeNum;
    this.getNoticeDetails(this.noticeNum);
  },
  methods: {
    getNoticeDetails(noticeNum) {
      this.$axios
        .get("/notices/detail/" + noticeNum)
        .then((res) => {
          this.noticeTitle = res.data.noticeTitle;
          this.noticeContents = res.data.noticeContents;
          this.writeDate = res.data.writeDate;
          this.readCount = res.data.readCount;
          this.originalFileName = res.data.originalFileName;
          this.renameFileName = res.data.renameFileName;
        })
        .catch((err) => {
          alert("게시글 조회 실패");
          console.log(err);
        });
    },

    downloadFile() {
      // 서버에 파일 다운로드 요청 보내기
      axios({
        url: `/notices/download/${this.renameFileName}`,
        method: "GET",
        responseType: "blob", // 응답 형식을 Blob으로 설정
      })
        .then((response) => {
          // 파일 다운로드를 위한 코드
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.renameFileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("파일 다운로드 실패:", error);
          console.log("에러 응답:", error.response);
        });
    },

    deleteNotice(noticeNum) {
      if (confirm("정말로 이 공지를 삭제하시겠습니까?")) {
        this.$axios
          .delete("/notices/" + noticeNum)
          .then(() => {
            alert("공지가 성공적으로 삭제되었습니다.");
            this.$router.push("/notice/");
          })
          .catch((err) => {
            alert("공지 삭제 실패");
            console.error(err);
          });
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
h4 {
  margin: 0px;
}

#noticeTitle {
  font-size: 40px;
}

#notice-contents {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 22px;
  overflow: hidden;
  width: 250px;
}

.redate {
  margin-left: 10px;
}

#button-group {
  margin-top: 25px;
  margin-bottom: 45px;
  text-align: center;
}

#notice img {
  /* 부모 요소에 맞게 이미지 크기 조절 */
  height: auto; /* 높이 자동으로 조절하여 비율 유지 */
  display: block; /* 이미지의 기본 디스플레이 속성 수정 */
  margin: 0 auto; /* 가운데 정렬을 위해 필요한 마진 추가 */
}

.up {
  border: 1px solid #ad578c;
  background-color: #ad578c;
  color: #ffff;
  padding: 15px 20px;
  cursor: pointer;
}

.can {
  margin-left: 20px;
  border: 1px solid #ad578c;
  background-color: #ad578c;
  color: #ffff;
  padding: 15px 20px;
  cursor: pointer;
}

.notice {
  margin-top: 100px;
  text-align: center;
}

.title {
  text-align: left;
}

.del {
  margin-left: 20px;
  border: 1px solid #ad578c;
  background-color: #ad578c;
  color: #ffff;
  padding: 15px 20px;
  cursor: pointer;
}

.tg th.border-leftnone,
.tg td.border-leftnone {
  border-left: none;
  width: 150px;
  height: 20px;
}

.tg th.border-rightnone,
.tg td.border-rightnone {
  border-right: none;
  width: 50px;
}

.tg td.border-downnone {
  border: none;
  height: 500px;
  width: 100px;
  word-break: break-all;
}

.tg {
  /* 최대 테이블 너비 설정 */
  width: 500px; /* 부모 요소에 맞게 테이블 확장 */
  border-collapse: collapse;
  border-spacing: 0;
  margin: 20px auto;
}

.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 15px 50px;
  overflow: hidden;

  word-break: normal;
}
.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: normal;
  padding: 15px 50px;
  overflow: hidden;
  padding: 20px 5px 15px 50px;
  word-break: normal;
}
.tg .tg-0lax {
  text-align: left;
  vertical-align: top;
}

.notice-content-container {
  max-height: 400px;
  margin-top: 10px;
  word-break: break-all;
  white-space: break-spaces;
}

#noticesub {
  margin: 80px 900px;
  font-size: 35px;
}
</style>
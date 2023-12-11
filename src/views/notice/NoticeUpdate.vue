<template>
  <div class="main-wrapper">
    <div class="main-container">
      <div>
        <div>
          <p>공지사항 수정</p>
        </div>

        <div class="inserttitles">
          <input
            id="noticetitle"
            type="text"
            size="60"
            v-model="noticeTitle"
            placeholder="제목을 입력해주세요."
          />
        </div>

        <div class="insertcontents">
          <textarea
            id="noticecontents"
            cols="100"
            rows="30"
            v-model="noticeContents"
            c
            style="resize: none"
          ></textarea>
        </div>

        <div id="attachment">
          <div id="noticenot">
            <form id="filenot" @submit.prevent="uploadFile">
              <span v-if="renameFileName">첨부 파일: {{ originalFileName }}</span>
              <span v-else>첨부파일 없음</span>
              <h4 class="attach">첨부파일 변경</h4>
              <div id="noticenot">
                <v-file-input v-model="file" ref="fileInput" @change="onFileChange" />
              </div>
            </form>
          </div>
        </div>

        <div id="writebutton">
          <input
            type="button"
            class="regi"
            @click="updateNotice"
            value="수정"
          />
          <input type="button" class="can" @click="goBack" value="취소" />
        </div>
      </div>
    </div>
  </div>
</template> 


<script>
export default {
  name: "NoticeUpdate",
  data() {
    return {
      noticeTitle: "",
      noticeContents: "",
      noticeNum: "",
      originalFileName: "",
      renameFileName: "",
      file: null,
    };
  },
  created() {
    this.noticeNum = this.$route.params.noticeNum;
    this.getNotice();
    console.log(this.noticeNum);
  },

  methods: {
    updateNotice() {
      const sendData = new FormData();
      const notice = {
        noticeNum: this.noticeNum,
        noticeTitle: this.noticeTitle,
        noticeContents: this.noticeContents,
      };
      console.log(JSON.stringify(notice));
      sendData.append(
        "notice",
        new Blob([JSON.stringify(notice)], { type: "application/json" })
      );

      sendData.append("file", this.file[0]);
      console.log("file:");
      console.log(this.file[0]);
      this.$axios
        .patch("/notices/" + this.noticeNum, sendData, {
          header: {
            "Context-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("게시글 수정 성공");

          // 게시글 수정 후 게시판 목록으로 이동
          this.$router.push("/notice/");
        })
        .catch((err) => {
          alert("게시글 수정 실패");
          console.log(err);
        });
    },

    getNotice() {
      this.$axios
        .get("/notices/detail/" + this.noticeNum)
        .then((res) => {
          const notice = res.data;
          this.noticeTitle = notice.noticeTitle;
          this.noticeContents = notice.noticeContents;
          this.originalFileName = notice.originalFileName;
          this.renameFileName = notice.renameFileName;

          this.$axios
            .get("/notices/image/" + this.renameFileName, {
              responseType: "blob",
            })
            .then((res) => {
              const blob = new Blob([res.data]);
              const imageUrl = URL.createObjectURL(blob);
              this.file = imageUrl;
              console.log(this.file);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getFileName(file) {
      if (file) {
        this.file = file;
      }
    },

     goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
p {
  margin: 100px 0 20px;
  font-size: 40px;
}

h5 {
  font-size: 22px;
}

.inserttitle {
  margin: 20px 0px;
}

#radioform {
  margin-bottom: 10px;
}

.notice-contents1 {
  margin-left: 30px;
}

.regi {
  background-color: #ad578c;
  color: #fff;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  margin-right: 70px;
}

.can {
  background-color: #ad578c;
  color: #fff;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
}

#noticetitle {
  border: 1px solid #ad578c;
  margin-bottom: 10px;
}

#noticecontents {
  border: 1px solid #ad578c;
}

#writebutton {
  margin-top: 20px;
  margin-left: 500px;
}

#attachment {
  display: flex;
  margin-top: 30px;
  margin-left: 840px;
}

#noticenot {
  margin-left: 30px;
}
</style>
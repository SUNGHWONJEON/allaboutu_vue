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
            cols="63"
            rows="30"
            v-model="noticeContents"
            c
            style="resize: none"
          ></textarea>
        </div>

        <div id="attachment">
          <div id="noticenot">
            <form id="filenot" @submit.prevent="uploadFile">
              <h4 class="attach">첨부파일 변경</h4>
              <input
                type="file"
                id="file_input"
                ref="fileInput"
                @change="getFileName($event.target.files)"
              />
               <button type="button" @click="cancelFileSelection">취소</button>
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

      if (this.file != null) {
        sendData.append("file", this.file[0]);
        console.log("file:");
      }

      this.$axios
        .patch("/notices/" + this.noticeNum, sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
          if (this.renameFileName != null) {
            this.$axios
              .get("/notices/image/" + this.renameFileName, {
                responseType: "arraybuffer",
              })
              .then((res) => {
                const blob = new Blob([res.data]);
                const contentType = res.headers["content-type"];
                let file = new File(
                  [blob],
                  this.originalFileName,
                  { type: contentType, lastModified: new Date().getTime() },
                  "utf-8"
                );
                this.file = file;
                console.log(file);

                let container = new DataTransfer();
                container.items.add(file);
                document.querySelector("#file_input").files = container.files;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getImageUrl() {
      return this.renameFileName
        ? `/notices/image/${
            this.renameFileName
          }?timestamp=${new Date().getTime()}`
        : null;
    },

    getFileName(file) {
      if (file) {
        this.file = file;
      }
    },

    cancelFileSelection() {
      // 파일 선택을 취소하는 로직
      const fileInput = document.getElementById('file_input');
      fileInput.value = ''; // 파일 선택 input의 값을 비웁니다.
      this.file = null;
    },

    goBack() {
      this.$router.go(-1);
    },

    onFileChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.file = files[0];
        this.originalFileName = this.file.name;
      }
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
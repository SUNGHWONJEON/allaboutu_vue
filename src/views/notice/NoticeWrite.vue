<template>
  <div class="main-wrapper">
    <div class="main-container">
      <div>
        <div>
          <p>공지사항 작성</p>
  
          <form id="radioform" @submit.prevent="writeNotice">
            <input
              type="radio"
              class="cartegory1"
              v-model="noticeType"
              value="option1"
              checked
              @change="handleEventRadio"
            /> 공지
            <input
              type="checkbox"
              class="cartegory1"
              name="group1"
              value="option3"
              @change="toggleCalendar"
            />필독공지
            <input type="date" v-if="showCalendar" v-model="importanceDate" />
          </form>
        </div>
        <div >
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

    
        <form @submit.prevent="uploadFile">
          <label for="fileInput">첨부파일 선택</label>
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            @change="getFileName($event.target.files)"
          />
           <div
              id="dropArea"
              class="drop-area"
              @dragover.prevent="handleDragOver"
              @drop.prevent="handleDrop"
            >
            </div>
        </form>

        <div id="writebutton">
          <input type="button" class="regi" @click="writeNotice" value="등록" />
          <input type="button" class="can" @click="goBack" value="취소" />
        </div>
      </div>
    </div>
  </div>
</template>
        
<script>
export default {
  name: "NoticeWrite",
  components: {},

  data() {
    return {
      ruserNum: 1,
      noticeTitle: "",
      noticeContents: "",
      cartegory: "notice",
      showCalendar: false,
      showEventCalendar: false,
      noticeType: "option1",
      deadlineDate: "",
      importance: "N",
      originalFilename: null,
      file: "",
      importanceDate: null,
      startDate: "", // 추가
      endDate: "", // 추가
    };
  },
  methods: {
    getFileName(files) {
      if (files) {
        this.file = files[0];
      }
    },

    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
      this.importance = this.showCalendar ? "Y" : "N";
    },

    compareDates(){
        const selectedDate = new Date(this.importanceDate)
        const isPastDate = selectedDate < new Date();
        
        return isPastDate;
    },
    writeNotice() {


      if (confirm("공지 글을 등록하시겠습니까?")) {
        console.log("공지 글 등록 ");
        if (this.importance === "Y" && (!this.importanceDate  )) {
          alert("필독 날짜를 선택해주세요.");
          console.log(this.importanceDate);
          return;
        } else if(this.importance === "Y" && this.compareDates()){
          alert("필독 날짜를 선택해주세요.");
        }
      } else {
        console.log("공지 등록 취소");
      }
      const sendData = new FormData();
      const notice = {
        userNum: this.ruserNum,
        noticeTitle: this.noticeTitle,
        noticeContents: this.noticeContents,
        importance: this.importance,
        importanceDate: new Date(this.importanceDate),
        cartegory: this.cartegory,
      };
      console.log(JSON.stringify(notice));
      sendData.append(
        "notice",
        new Blob([JSON.stringify(notice)], { type: "application/json" })
      );
      sendData.append("file", this.file);

      this.$axios
        .post("/notices", sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          alert("게시글 등록 성공");

          // 게시글 등록 후 게시판 목록으로 이동
          this.$router.push("/notice/");
        })
        .catch((err) => {
          alert("게시글 등록 실패");
          console.log(err);
        });
    },
  
  

    goBack() {
      this.$router.go(-1); // Vue Router를 사용하는 경우
      // window.history.back(); // 일반적인 브라우저의 이전 페이지로 이동하는 경우
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
}

/* 첨부파일 영역 스타일 */
.file-input {
  position: relative;
  overflow: hidden;
  display: inline-block;
  margin-top: 20px;
}

.file-input input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
}

.file-input label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ad578c;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

/* 드래그 오버 시 스타일 */
.drop-area.drag-over {
  background-color: #f0f0f0;
}
</style>
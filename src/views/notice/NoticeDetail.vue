<template>
  
  <div class="main-wrapper">
  <div class="main-container">
     <div class>
        <h3>{{ noticeTitle }}</h3>
        <div>
          <p>{{ readCount }}</p>
          <br>
          <span>{{ writeDate }}</span>
        </div>
      </div>
      <div class="board-contents">
        <span>{{ noticeContents }}</span>
      </div>
      <hr>
      <h4 class="attach">첨부파일</h4>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="fileInput" id="fileInput" accept=".jpg, .jpeg, .png" required>
        <button type="submit"></button>
      </form>
      <hr>
      <div>
        <input type="button" class="regi" @click="writeNotice" value="수정 페이지로 이동">
        <input type="button" class="can" @click="goBack" value="취소">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoticeDetail',
  data() {
    return {
      noticeTitle: '',
      noticeContents: '',
      writeDate: '',
      readCount: ''
    };
  },
  mounted() {
    const noticeNum = this.$route.params.noticeNum;
    this.getNoticeDetails(noticeNum);
  },
  methods: {
    getNoticeDetails(noticeNum) {
        this.$axios.get('/notices/' +  noticeNum)
        .then(res => {
          console.log(response.data); // 확인용 콘솔 로그
          const noticeData = response.data;
          this.noticeTitle = noticeData.noticeTitle;
          this.noticeContents = noticeData.noticeContents;
          this.writeDate = noticeData.writeDate;
          this.readCount = noticeData.readCount;
        })
        .catch(err => {
          alert('게시글 조회 실패');
          console.log(err);
        })
    },
  },
};

</script>

<style scoped>
     p{
    margin-top:150px;
   }

   .inserttitle{
     margin: 20px 0px;
   }
     
    #radioform{
      

      margin-bottom: 10px;
     
    }

    .notice-contents1{
      margin-left: 30px;
    }

    .regi{
      
    background-color: #ad578c; 
    color: #fff; 
    border: none;
    padding: 15px 20px;
    cursor: pointer;
    margin-right : 70px;
     
  }

   .can{
      
    background-color: #ad578c; 
    color: #fff; 
    border: none;
    padding: 15px 20px;
    cursor: pointer;
     
  }
</style>
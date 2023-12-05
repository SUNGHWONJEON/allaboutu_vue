<template>
  
  
     <div class>
        <h3>{{ noticeTitle }}</h3>
        <div>
          <p>{{ readCount }}</p>
          <br>
          <span>{{ writeDate }}</span>
        </div>
      </div>
      <div class="notice-contents">
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
      readCount: '',
      noticeNum: '',
    };
  },
  mounted() {
    this.noticeNum = this.$route.params.noticeNum;
    this.getNoticeDetails(this.noticeNum);
  },
  methods: {
    getNoticeDetails(noticeNum) {
        this.$axios.get('/notices' + noticeNum)
        .then(res => {
          this.noticeTitle = res.data.noticeTitle;
          this.noticeContents = res.data.noticeContents;
          this.writeDate = res.data.writeDate;
          this.readCount = res.data.readCount;
          
          
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
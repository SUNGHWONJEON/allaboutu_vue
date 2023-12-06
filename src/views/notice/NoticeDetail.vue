<template>
  <div class="notice-container">
    <div class="notice-header">
      <h3 id="noticeTitle">공지 제목 <span>{{ noticeTitle }}</span></h3>
    </div>
    <div id="notice-meta">
        <p>조회 수{{ readCount }}</p>
        <span class="redate">등록 날짜 {{ writeDate }}</span>
      </div>
    <div id="notice-contents">
      <p>{{ noticeContents }}</p>
    </div>
    
    <hr class="divider">
    <h4 class="attach">첨부파일</h4>
    <hr class="divider">
    
    <router-link to="/notice/update">
      <input type="button" class="regi" @click="updateNotice(noticeNum)" value="공지 수정 페이지로 이동">
      </router-link>

    <div id="button-group">
     
      <input type="button" class="del" @click="deleteNotice(noticeNum)" value="공지 글 삭제">
      <input type="button" class="can" @click="goBack" value="뒤로가기">
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
        this.$axios.get('/notice/detail/' + noticeNum)
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

    deleteNotice(noticeNum) {
    if (confirm('정말로 이 공지를 삭제하시겠습니까?')) {
      this.$axios.delete('/notice/' + noticeNum)
        .then(() => {
          alert('공지가 성공적으로 삭제되었습니다.');
          this.$router.push('/notice/');
        })
        .catch(err => {
          alert('공지 삭제 실패');
          console.error(err);
        });
    }
  },

   
  

},
  

};

</script>

<style scoped>
    
   #noticeTitle{
    margin-top: 100px ;
    font-size: 40px;
   }

   #notice-meta{
    margin-left: 1400px;
    font-size: 15px;
    display: flex;
   }

  #notice-contents{
    margin-top: 80px;
    margin-bottom: 100px;
    text-align: center;
    font-size:25px;
  }

  .redate{
    margin-left: 10px;
  }

  #button-group{
    margin-top: 40px;
    margin-left: 1400px;
    
  }

  .regi{
    
    border: 1px solid #ad578c;
    background-color:#ad578c;
    color:#ffff;
    
  }

  .can{
    margin-left: 30px;
    border: 1px solid #ad578c;
    background-color:#ad578c;
    color:#ffff;
  }

  .del{
    margin-left: 30px;
    border: 1px solid #ad578c;
    background-color:#ad578c;
    color:#ffff;
  }

</style>
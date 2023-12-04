<template>
    <PageHeader/>
<div class="main-wrapper">
  <div class="main-container">
    <div >
      <div >
        <p >공지사항 작성</p>
        <hr>
          <h5 >공지유형</h5>
        <form id="radioform" @submit.prevent="writeNotice">
          <input type="radio" class="cartegory1" v-model="noticeType" value="option1" checked @change="handleEventRadio">일반 공지
          <input type="radio" class="cartegory1" v-model="noticeType" value="option2" @change="handleEventRadio">이벤트
           <input type="checkbox" class="cartegory1" name="group1" value="option3" @change="toggleCalendar">필독공지  
            <input type="date" v-if="showCalendar" v-model="deadlineDate">
          <div class="eventn" v-if="showEventCalendar">
            <label for="startDate">이벤트 시작일:</label>
            <input type="date" id="startDate" v-model="startDate" />
            <label for="endDate">이벤트 종료일:</label>
            <input type="date" id="endDate" v-model="endDate" />
            <div v-if="showCalendar1"></div>
          </div>
        </form>  
      </div>

      <div class="inserttitle">
        <input type="text" size="60" v-model="noticeTitle" class="w3-input w3-border" placeholder="제목을 입력해주세요." />
      </div>
        
      <div >
        <textarea  cols="100" rows="30" v-model="noticeContents" class="w3-input w3-border" style="resize: none;"></textarea>
      </div>
      
      <hr>
      <h4 class="attach">첨부파일</h4>
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="fileInput" id="fileInput" accept=".jpg, .jpeg, .png" required>
        <button type="submit"></button>
      </form>

      <hr>
      <div>
        <input type="button" class="regi" @click="writeNotice" value="등록">
        <input type="button" class="can" @click="goBack" value="취소">
      </div>
    </div>
  </div>
</div>
  
     
  <PageFooter />
</template>
        
<script>

import PageHeader from "../common/PageHeader.vue";

export default {
  name: 'NoticeWrite',
  components: {
    PageHeader,
    
  },
  
  data() {
    return {
      
      ruserNum: 1,
      noticeTitle: "",
      noticeContents: "",
      cartegory: "",
      showCalendar: false,
      showEventCalendar: false,
      noticeType: "option1",
      deadlineDate: "",
      importance: "N",
      originalFileName: "",

    };
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
      this.importance = (this.showCalendar ? 'Y' : 'N')
    },
    writeNotice() {
            if (!this.noticeType) {
                setTimeout(() => {
                   
                }, 3000);
          
            if (confirm("공지 글을 등록하시겠습니까?")) {

                console.log("공지 글 등록 ");
            } else {
            console.log("공지 등록 취소");
        }    
      }

      this.$axios.post('/notices', {
                
                userNum: 1,// 임시 writer id
                noticeTitle: this.noticeTitle,
                noticeContents: this.noticeContents,
                importance: this.importance,
                //originalFileName: this.originalFileName,
                 cartegory: this.noticeType == 'option1' ? '공지사항' : '이벤트',
                
            })
            .then(res => {
                alert('게시글 등록 성공');

                // 게시글 등록 후 게시판 목록으로 이동
                this.$router.push('/notices');
            })
            .catch(err => {
                alert('게시글 등록 실패');
                console.log(err);
            })
     },

      goBack() {
      this.$router.go(-1); // Vue Router를 사용하는 경우
      // window.history.back(); // 일반적인 브라우저의 이전 페이지로 이동하는 경우
    } ,

     handleEventRadio() {
      if (this.noticeType === 'option2') {
        // 이벤트 라디오 버튼을 선택했을 때 실행되는 로직
        // 여기에 이벤트 시작일과 종료일을 설정하는 로직을 추가하세요.
        // 예시로 현재 날짜로 초기화하는 코드를 추가했습니다.
        const currentDate = new Date();
        this.showEventCalendar = true;
        this.startDate = currentDate.toISOString().split('T')[0]; // 현재 날짜
        this.endDate = ''; // 이벤트 종료일 초기화
      } else {
        this.showEventCalendar = false; // 이벤트 라디오 버튼이 아닌 경우 날짜 상자 감추기
        
      }
    },

  },
    
}

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
<template>
    <PageHeader/>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
              <div class="no">
                <h4 class="title1">NOTICE</h4>
                <p class="insert">공지사항 작성</p>
                <hr>
                <div class="noticebox">
                
                <div class="notice-1">
                    <h5 class="cartegory">공지유형</h5>
                    <form id="radioform">
                      <input type="radio"  class="cartegory1" v-model="noticeType" value="option1" checked  @change="handleEventRadio"  >일반 공지
                      <input type="radio"  class="cartegory1" v-model="noticeType" value="option2" @change="handleEventRadio" >이벤트
                      <div  class="eventn" v-if="showEventCalendar">
                          <label for="startDate">이벤트 시작일:</label>
                          <input type="date" id="startDate" v-model="startDate" />
            
                          <label for="endDate">이벤트 종료일:</label>
                          <input type="date" id="endDate" v-model="endDate" />
                      </div>
                    
                      <input type="checkbox"  class="cartegory1" name="group1" value="option3" @change="toggleCalendar">필독공지  
                      <input type="date"  v-if="showCalendar"  v-model="deadlineDate">
                      <div v-if="showCalendar1">
                      
                    </div>
                  </form>  

             
                </div>

                <div class="notice-contents1">
                  <input type="text" size="60" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요." />
               </div>
                
                <div class="notice-contents">
                  <textarea id="" cols="100" rows="30" v-model="contents" class="w3-input w3-border" style="resize: none;">
                  </textarea>
                </div>
              </div>
                <hr>
                    <h4 class="attach">첨부파일</h4>
                <hr>
                <div class="b1">
                <button class="re"  @click="registerNotice">등록</button>
                <button clasee="can">취소</button>
                </div>
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
      title: "",
      contents: "",
      showCalendar: false,
      showEventCalendar: false,
      noticeType: "option1",
      deadlineDate: "",
    };
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    
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

   registerNotice() {
      console.log("등록된 공지 정보:", {
        noticeType: this.noticeType,
        showCalendar: this.showCalendar,
        deadlineDate: this.deadlineDate,
        title: this.title,
        contents: this.contents,
      });
    },
  }




</script>


<style>
    
    hr{
      width:900px;
    }    
     .cartegory1{
      margin-left:20px;
      
     }
    
    .cartegory{
      font-size: 25px;
      margin-left: 20px;
    }

     .eventn{
      text-align: center;
      display: flex;
      margin:30px 0 30px;
     }

     .attach{
      text-align: left;
     }

     .noticebox{
      text-align: left;
      margin-left: 0px;
     }


     .title1{
      font-size: 35px;
      margin-left:350px;
     }

     .insert{
       font-size: 22px;
       margin-left:350px;
     }
     
    #radioform{
      

      margin-bottom: 10px;
     
    }

    .notice-contents1{
      margin-left: 30px;
    }

    
     
    
</style>
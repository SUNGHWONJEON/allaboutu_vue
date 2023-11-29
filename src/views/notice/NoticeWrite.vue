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
                      <input type="radio"  class="cartegory1" name="group1" value="option1" checked  >일반 공지
                      <input type="radio"  class="cartegory1" name="group1" value="option2"  >이벤트
                      <input type="checkbox"  class="cartegory1" name="group1" value="option3" @change="toggleCalendar">필독공지  
                      <input type="date"  v-if="showCalendar"  v-model="deadlineDate">
                    </form>  
                </div>
                   <div class="notice-contents1">
                    <input type="text" size="60" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
                  </div>
                </div>
                
                <div class="notice-contents">
                  <textarea id="" cols="100" rows="30" v-model="contents" class="w3-input w3-border" style="resize: none;">
                  </textarea>
                </div>

                <hr>
                    <h4>첨부파일</h4>
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
import PageFooter from "../common/PageFooter.vue";
import PageHeader from "../common/PageHeader.vue";

export default {
  name: 'NoticeWrite',
  components: {
    PageHeader,
    PageFooter
  },

  data() {
    return {
      title: "",
      contents: "",
      showCalendar: false,
      noticeType: "option1",
      deadlineDate: "",
    };
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
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
     
     .cartegory1{
      margin-left:20px;
     }

     .noticebox{
      text-align: left;
      margin-left: 0px;
     }

     .no{

      margin:0px 200px;
     }

     .title1{
      font-size: 35px;
     }

     .insert{
       font-size: 22px;
     }
     
    #radioform{
      

      margin-bottom: 10px;
     
    }

     .notice-contents{
      margin:30px;
     }
     
    
</style>
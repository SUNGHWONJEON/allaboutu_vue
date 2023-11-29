<template>
   
         <PageHeader/>
    <div class="main-wrapper">
        <div class="main-container">
            <div class="contents-boxes">
              <div class="no">
                <p class="insert">공지사항 상세페이지</p>
                 <h5 class="text5"> [공지] </h5>
                <div class="text">
                      <p class="time">2023.11.29</p>
                      <p class="read">조회 수 </p>
                </div>
                <hr>
                <div class="noticebox">
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
                    <button class="re">수정</button>
                    <button class="can">삭제</button>
                    <button >이전 페이지로 이동</button>
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
 document.getElementsByName('group1').forEach(radio => {
        radio.addEventListener('change', () => {
            console.log(`선택된 옵션: ${radio.value}`);
        });
    });


export default {
   name:'NoticeDetail',
   
}
</script>

<style>
      .text{
        display:flex;
      }

      .text p {
        font-size: 15px;
      }

     .time{
        margin-right: 20px;
      }
      .text5{
        font-size: 25px;
        margin-right: 8px;
      }  

     .cartegory1{
      margin-left:20px;
     }

     .noticebox{
      text-align: left;
      margin-left: 80px;
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
    
    .b1 {
      margin-left: 600px;
    }
   .b1 button {
      margin-top: 40px;
      margin-left: 5px;
      color: blue;
   }

   #datetime{
    display: none;
   }
</style>
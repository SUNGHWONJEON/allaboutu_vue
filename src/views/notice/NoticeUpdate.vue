<template>
<div class="main-wrapper">
  <div class="main-container">
    <div >
      <div >
        <p  >공지사항 수정</p>
        <hr>

      </div>

      <div class="inserttitles">
        <input id="noticetitle" type="text" size="60" v-model="noticeTitle"  placeholder="제목을 입력해주세요." />
      </div>
        
      <div class="insertcontents">
        <textarea id="noticecontents" cols="100" rows="30" v-model="noticeContents" c style="resize: none;"></textarea>
      </div>
      
      <hr>
      <h4 class="attach">첨부파일</h4>
      <form @submit.prevent="uploadFile" >
        <input type="file" name="fileInput" id="fileInput" @change="handleFileChange" />
        <button type="submit">Upload</button>
      </form>

      <hr>
      <div id="writebutton">
        <input type="button" class="regi" @click="writeNotice" value="수정">
        <input type="button" class="can" @click="goBack" value="취소">
      </div>
    </div>
  </div>
</div>

    
 </template> 


<script>
import axios from 'axios';

export default {
  name: 'NoticeUpdate',
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
   
  },
  
  

};

</script>

<style scoped>
    
    p{
    margin:100px 0 20px;
    font-size:40px;
   }

   h5{
    font-size:22px;
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

  #noticetitle{
    border: 1px solid #ad578c;
    margin-bottom: 10px;
  }

  #noticecontents{
    border: 1px solid #ad578c;
  }
  
  #writebutton{
    margin-top: 20px;
  }

</style>
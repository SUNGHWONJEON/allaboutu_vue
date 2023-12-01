<template>
     <div class="board-contents">
                       
                 <div>
      <select v-model="search_key">
        <option value="title">제목</option>
      </select>
      &nbsp;
      <input type="text" v-model="search_value" @keyup.enter="fnPage()">
      &nbsp;
      <button @click="fnPage()">검색</button>
      &nbsp;
      <button @click="fnAll()">전체목록</button>
    </div>
    <div class="board-list">
      <div class="common-buttons">
       
      </div>
    <table class="w3-table-all">
        <thead>
        <tr>
          <th>공지번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
          <th>첨부파일</th>
        </tr>
        </thead>
      <tbody>            
         <tr v-for="(row, noticeNum) in list" :key="noticeNum">   
          <td>{{ row.noticeNum }}</td>     
          <!-- <td><a v-on:click="fnNoticeView(`${row.noticeNum}`)" :style="{ color: row.noticeTitle ? 'blue' : '', textDecoration: 'none' }" class="hover-effect">{{ row.noticeTitle }}</a></td> -->
          <td>
          <router-link :to="{ path: '/notice/detail', query: { noticeNum: row.noticeNum } }" :style="{ color: row.noticeTitle ? 'blue' : '', textDecoration: 'none' }" class="hover-effect">{{ row.noticeTitle }}</router-link>
        </td>
          <td>{{ row.userNum }}</td>
          <td>{{ row.writeDate }}</td>
          <td>{{row.originalFileName}}</td>
         </tr>
      </tbody>
    </table>
      <router-link to="/notice/write">
         <button class="register" @click="fnPage()">글쓰기</button>
      </router-link>

      <!-- <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0">
        <span class="pg">
        <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
        <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"
           class="prev w3-button w3-border">&lt;</a>
        <template v-for=" (n,index) in paginavigation()">
            <template v-if="paging.page==n">
                <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
            </template>
            <template v-else>
                <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
            </template>
        </template>
        <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"
           @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-border">&gt;</a>
        <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
        </span>
      </div>
    </div> -->
      <!-- <div class="page-btn">
        <button>[맨처음]</button>&nbsp;
        <button>[이전그룹]</button>&nbsp;
        <button>1 2 3 4 5</button>&nbsp;
        <button>[다음그룹]</button>&nbsp;
        <button>[맨뒤]</button>&nbsp;
      </div> -->

    </div>

    

  </div>
</template>

<script>
  export default {
    data() { //변수생성
      return {
        list: [],
      }
      // return {
      //   requestBody: {}, //리스트 페이지 데이터전송
      //   list: {}, //리스트 데이터
      //   no: '', //게시판 숫자처리
      //   paging: {
      //     block: 0,
      //     end_page: 0,
      //     next_block: 0,
      //     page: 0,
      //     page_size: 0,
      //     prev_block: 0,
      //     start_index: 0,
      //     start_page: 0,
      //     total_block_cnt: 0,
      //     total_list_cnt: 0,
      //     total_page_cnt: 0,
      //   }, //페이징 데이터
      //   page: this.$route.query.page ? this.$route.query.page : 1,
      //   size: this.$route.query.size ? this.$route.query.size : 10,
      //   //keyword: this.$route.query.keyword,
      //   search_key: this.$route.query.sk ? this.$route.query.sk : '',
      //   search_value: this.$route.query.sv ? this.$route.query.sv : '',
      //   paginavigation: function () { //페이징 처리 for문 커스텀
      //     let pageNumber = [] //;
      //     let start_page = this.paging.start_page;
      //     let end_page = this.paging.end_page;
      //     for (let i = start_page; i <= end_page; i++) pageNumber.push(i);
      //     return pageNumber;
      //   }
      // }
    },
    mounted() {
      // this.fnGetList();
      this.$axios.get('/notices')
      .then((res) => {
        this.list = res.data
        console.log(list)
      }).catch((err)=> {
        console.log(err);
      })
     
    },
    methods: {
      // fnGetList() {
      //   //스프링 부트에서 전송받은 데이터 출력 처리
      //   this.requestBody = { // 데이터 전송
      //   //keyword: this.keyword,
      //   sk: this.search_key,
      //   sv: this.search_value,
      //   page: this.page,
      //   size: this.size
      // }


      // this.$axios.get(this.$serverUrl + "/notice/list", {
      //   params: this.requestBody,
      //   headers: {}
      // }).then((res) => {     

      //   //this.list = res.data  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
      //   if (res.data.result_code === "OK") {
      //     this.list = res.data.data
      //     this.paging = res.data.paginavigation
      //     this.nos = this.paging.totalListCnt - 

      //   }
      // }).catch((err) => {
      //   if (err.message.indexOf('Network Error') > -1) {
      //     alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
      //   }

      // })


    
  

        //임시 데이터 출력 처리
        // this.list = [
        //   {
        //       "idx":1,
        //       "title": "제목1",
        //       "author": "작성자1",
        //       "created_at": "작성일시1"
        //   },
        //   {
        //       "idx":1,
        //       "title": "제목1",
        //       "author": "작성자1",
        //       "created_at": "작성일시1"
        //   },
        //   {
        //       "idx":1,
        //       "title": "제목1",
        //       "author": "작성자1",
        //       "created_at": "작성일시1"
        //   }
        // ]
     // },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },
    fnPage(n) {
      if (this.page !== n) {
        this.page = n        
      }
      this.fnGetList()
    },
    fnAll() {
      this.search_key = null
      this.search_value = null
      this.fnGetList()
    }
    }
  }
</script>

<style>
      
      h3 {
        
         text-align: center;
         margin-top: 350px;
      }
     .w3-table-all {
            width: 1000px;
            border-collapse: collapse;
            margin: 70px;
            margin-top: 30px;
        }
      .register{
        margin-left: 500px;
        background-color: #00ccff; /* 적절한 색상으로 변경 가능 */
        color: #fff; /* 텍스트 색상을 밝게 설정 */
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }

        th,td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: center;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #f5f5f5;
        }
    .search {
        margin: 100px;
    }

   
</style>
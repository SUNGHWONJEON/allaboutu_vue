<template>
  <div class="notice-contents">
    <div>
      <select id="noticeop" v-model="search_key">
        <option value="title">제목</option>
      </select>
      &nbsp;
      <input id="notices" type="text" v-model="search_value" @keyup.enter="fnSearch">
      &nbsp;
      <button class="searchtitle" @click="fnSearch">검색</button>
      &nbsp;
      <button class="allList" @click="fnAll">전체목록</button>
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
      <tr v-for="row in list" :key="row.noticeNum">
        <td>
            <!-- 필독 텍스트 -->
            <span v-if="row.importance">필독 </span>
            <!-- 공지번호 -->
            {{ row.noticeNum }}
       </td> 
        <td>
          <router-link :to="{ path: '/notice/detail/' + row.noticeNum }" :style="{ color: row.noticeTitle ? 'blue' : '', textDecoration: 'none' }" class="hover-effect">{{ row.noticeTitle }}</router-link>
        </td>
        <td>{{ row.userNum === 1 ? '관리자' : row.userNum }}</td>
        <td>{{ row.writeDate }}</td>
        <td>
          <img v-if="row.renameFileName !== null" id="notice_img" src="@/assets/images/notice/attachment_87543.png" alt="Attachment Image">
        </td>
      </tr>
    </table>

    <!-- 페이징 버튼 추가 -->
    <div>
      <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">이전</button>
      <button class="page-btn" @click="movePage(pageNumber)" v-for="pageNumber in pageNumbers" :class="{ 'current-page': isCurrentPage(pageNumber) }"  :key="pageNumber"> {{ pageNumber }}</button>
      <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>

    <router-link to="/notice/write">
      <button class="register">글쓰기</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      search_key: '',
      search_value: '',
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fnPage();
    console.log('Data:', this.list);
  },
  computed: {
    pageNumbers(){
      return Array.from({length: this.totalPages}, (_, index) => index +1);
    },

      isCurrentPage() {
      return (pageNumber) => pageNumber === this.currentPage;
    },
    
  },

  methods: {
    fnPage() {
      this.$axios
        .get('/notice', {
          params: {
            search_key: this.search_key,
            search_value: this.search_value,
            page: this.currentPage - 1,
          },
        })
        .then((res) => {
          this.list = res.data.content;
          this.totalPages = res.data.totalPages;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    fnSearch() {
      this.currentPage = 1; // 검색 시에는 첫 페이지로 설정
      this.fnPage();
    },
    fnAll() {
      this.search_key = '';
      this.search_value = '';
      this.fnPage();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fnPage();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fnPage();
      }
    },
    movePage(pageNumber){
      this.currentPage = pageNumber;
      this.fnPage();
    }
  },
};
</script>


<style>
    #notices, #noticeop{
      border:1px solid #ad578c;
    }

    .page-btn{
      font-size: 15px;
      margin-left: 7px;
      color:#ad578c;
    }
    h3 {
      
        text-align: center;
        margin-top: 350px;
    }
    .w3-table-all {
          width: 950px;
          border-collapse: collapse;
          margin-top: 45px;
          
      }
    .register{
      margin-left: 500px;
      background-color: #ad578c; /* 적절한 색상으로 변경 가능 */
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

    .searchtitle, .allList{
      color:#ad578c;
      
    }

    .current-page {

      background-color: #ad578c;
      color: #fff;

      width: 30px; 
      height: 30px; 
}
  #notice_img{
    width: 30px; 
    height: 30px; 
  }

   
</style>
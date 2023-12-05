<template>
     <div class="board-contents">
                       
                 <div>
      <select v-model="search_key">
        <option value="title">제목</option>
      </select>
      &nbsp;
      <input type="text" v-model="search_value" @keyup.enter="fnPage()">
      &nbsp;
      <button class="searchtitle" @click="fnPage()">검색</button>
      &nbsp;
      <button class="allList" @click="fnAll()">전체목록</button>
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
       <tr v-for="(row, noticeNum) in list" :key="noticeNum">   
        <td>
          {{row.important ? '필독 ' : ''}}
          {{ row.noticeNum }}
          </td>
        <td>
            <router-link :to="{ path: '/notices/details/' + noticeNum }" :style="{ color: row.noticeTitle ? 'blue' : '', textDecoration: 'none' }" class="hover-effect">{{ row.noticeTitle }}</router-link>
        </td>
        <td>{{ row.userNum === 1 ? '관리자' : row.userNum }}</td>
        <td>{{ row.writeDate }}</td>
        <td>{{ row.originalFileName ? '*' : '' }}</td>
    </tr>
    </table>
      <router-link to="/notices/write">
         <button class="register" @click="fnPage()">글쓰기</button>
      </router-link>

      
    </div>

    

  </div>
</template>

<script>
  export default {
    data() { //변수생성
      return {
        list: [],
        search_key: '',
        search_value: '',
      }
     
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
   
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: './details',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    },
    fnPage(n) {
      
      // 검색을 위한 로직 구현
      // 예: 검색어와 관련된 서버 요청을 보내거나, 로컬 데이터에서 필터링을 수행

      // 아래는 가상의 검색 로직 (서버로의 요청을 시뮬레이션)
      this.$axios.get('/notices', { params: { search_key: this.search_key, search_value: this.search_value } })
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
   
    },
    fnAll() {
      this.search_key = null
      this.search_value = null
      this.fnGetList()
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

    .searchtitle, .allList{
      color:#ad578c;
    }
  

   
</style>
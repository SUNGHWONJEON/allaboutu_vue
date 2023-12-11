<template>
  <div class="notice-contents">
    <div class="searchbox">
      <select id="noticeop" v-model="search_type">
        <option value="title" selected>제목</option>
        <option value="contents">내용</option>
      </select>
      &nbsp;
      <input
        id="notices"
        type="text"
        v-model="search_keyword"
        @keyup.enter="fnSearch"
      />
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
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="n in importanceList"
          :key="n.noticeNum"
          :class="{ 'important-row': n.importance === 'Y' }"
        >
          <td>
            <!-- 공지번호 -->

            <span v-show="n.importance === 'Y'"
              ><h5 class="essential">[필독!]</h5></span
            >
          </td>
          <td>
            <router-link
              :to="{ path: '/notice/detail/' + n.noticeNum }"
              :style="{
                color: n.noticeTitle ? 'black' : '',
                textDecoration: 'none',
              }"
              class="hover-effect"
              >{{ n.noticeTitle }}</router-link
            >
          </td>
          <td>{{ n.userName }}</td>
          <td>{{ n.writeDate }}</td>
          <td>
            <img
              v-if="n.renameFileName !== null"
              id="notice_img"
              src="@/assets/images/notice/attachment_87543.png"
              alt="Attachment Image"
            />
          </td>
          <td>{{ n.readCount }}</td>
        </tr>
      </tbody>

      <tr v-for="row in list" :key="row.noticeNum">
        <td>
          <!-- 공지번호 -->
          {{ row.noticeNum }}
        </td>
        <td>
          <router-link
            :to="{ path: '/notice/detail/' + row.noticeNum }"
            :style="{
              color: row.noticeTitle ? 'black' : '',
              textDecoration: 'none',
            }"
            class="hover-effect"
            >{{ row.noticeTitle }}</router-link
          >
        </td>
        <td>{{ row.userName }}</td>
        <td>{{ row.writeDate }}</td>
        <td>
          <img
            v-if="row.renameFileName !== null"
            id="notice_img"
            src="@/assets/images/notice/attachment_87543.png"
            alt="Attachment Image"
          />
        </td>
        <td>{{ row.readCount }}</td>
      </tr>
    </table>

    <!-- 페이징 버튼 추가 -->
    <div>
      <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">
        이전
      </button>
      <button
        class="page-btn"
        @click="movePage(pageNumber)"
        v-for="pageNumber in pageNumbers"
        :class="{ 'current-page': isCurrentPage(pageNumber) }"
        :key="pageNumber"
      >
        {{ pageNumber }}
      </button>
      <button
        class="page-btn"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        다음
      </button>
    </div>

    <router-link to="/notice/write">
      <button class="register">작성하기</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      importanceList: [],
      search_type: "",
      search_keyword: "",
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fnPage();
    this.getImportance();
    console.log("Data:", this.list);
    console.log(this.importanceList);
  },
  computed: {
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },

    isCurrentPage() {
      return (pageNumber) => pageNumber === this.currentPage;
    },
  },

  methods: {
    fnPage() {
      this.$axios
        .get("/notices", {
          params: {
            search_type: this.search_type,
            search_keyword: this.search_keyword,
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

    getImportance() {
      this.$axios
        .get("/notices/imp")
        .then((res) => {
          this.importanceList = res.data;
          console.log(this.importanceList);
        })
        .catch((err) => {
          console.error(err);
        });
    },

   fnSearch() {
    if (!this.search_keyword || !this.search_type) {
      alert  ("검색어를 입력해주세요.");
      return;
    }

  this.$axios
    .get("/notices/search", {
      params: {
        searchType: this.search_type,
        keyword: this.search_keyword,
        page: this.currentPage - 1,
        size: 10,
      },
    })
    .then((res) => {
      this.list = res.data.content; // 검색 결과를 변수에 저장
      this.totalPages = res.data.totalPages;
      this.errorMessage = ""; // 에러 메시지 초기화
    })
    .catch((error) => {
      console.error("검색 실패:", error);
      cosole.log(this.errorMessage);
    });
},
    fnAll() {
      this.search_type = "";
      this.search_keyword = "";
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
    movePage(pageNumber) {
      this.currentPage = pageNumber;
      this.fnPage();
    },
  },
};
</script>


<style>
#notices,
#noticeop {
  border: 1px solid #ad578c;
  appearance: auto;
}

.page-btn {
  font-size: 15px;
  margin-left: 7px;
  color: #ad578c;
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
.register {
  margin-top: 20px;
  margin-left: 880px;
  background-color: #ad578c; /* 적절한 색상으로 변경 가능 */
  color: #fff; /* 텍스트 색상을 밝게 설정 */
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

th,
td {
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

.searchbox {
  width: 500px; /* 가로 길이 조절 */
  height: 50px; /* 세로 길이 조절 */
  padding: 15px 10px 10px;
  background-color: #f6f7fb; /* 배경 색상 지정 */
  margin-left: 452px; /* 여백 설정 */
}

.search {
  margin: 100px;
}

.searchtitle,
.allList {
  color: #ad578c;
}

.current-page {
  background-color: #ad578c;
  color: #fff;

  width: 30px;
  height: 30px;
}
#notice_img {
  width: 30px;
  height: 20px;
}

.important-row {
  background-color:#ffc0cb; /* 필독인 경우의 배경색을 여기서 지정하세요. */
  font-weight: bold; /* 필독인 경우의 글자를 두껍게 만듭니다. */
}

.essential {
  color: #a52a2a;
  font-size: 14px;
}
</style>
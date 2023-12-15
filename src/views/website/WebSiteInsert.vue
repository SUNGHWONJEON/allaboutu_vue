<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>웹번호</th>
            <th>이미지</th>
            <th>브랜드</th>
            <th>타이틀</th>
            <th>가격</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.id }}</td>
            <td><img :src="product.image" alt="product image"></td>
            <td>{{ product.brand }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="edit(index)">수정</button>
              <button @click="remove(index)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div>
        <button @click="prevPage">이전 페이지</button>
        <button @click="nextPage">다음 페이지</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [], // 제품 정보 배열
        searchTerm: '', // 검색어
        page: 1, // 현재 페이지
        // 기타 필요한 데이터...
      };
    },
    methods: {
      search() {
        // 검색 기능 구현...
      },
      edit(index) {
        // 수정 기능 구현...
      },
      remove(index) {
        // 삭제 기능 구현...
      },
      prevPage() {
        if (this.page > 1) this.page--;
        // 페이지 변경 후 데이터 갱신...
      },
      nextPage() {
        this.page++;
        // 페이지 변경 후 데이터 갱신...
      },
      // 기타 필요한 메서드...
    },
    created() {
      // 처음 생성 시 데이터 로딩...
    },
  };
  </script>
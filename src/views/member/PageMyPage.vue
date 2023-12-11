<template>
    <table id="outer" align="center" width="700" celspacing="5" cellpadding="0">
     <tr class="MyPage">
         <td class="container-fluid">
             <div class="row align-items-center">
                 <div class="col">
                 </div>
                 <div class="col">
                     <div id="logo3" class="contents-boxes">마이페이지</div>
                     <h5 class='mt-4'>아이디</h5>
                     <div>{{ infor.userId }}</div>
                     <h5 class="mt-4">email</h5>
                     <div>{{ infor.userEmail }}</div>
                     <h5 class="mt-4">이름</h5>
                     <div>{{ infor.userName }}</div>
                     <h5 class="mt-4">전화번호</h5>
                     <div>{{ infor.userPhone }}</div>
                     <input type="button" @click="openPhone" class="btn btn-primary btn-default btn-sm mt-3" value="전화번호 변경하기">
                     <h5 class="mt-4">비밀번호 변경</h5>
                     <div>현재 비밀번호를 입력해주세요.</div>
                     <input type="password" class="form-control joinInput mt-2" id="originPwd" placeholder="현재 비밀번호를 입력해주세요.">
                     <div>새로 사용하실 비밀번호를 입력해주세요.</div>
                     <input type="password" class="form-control joinUnpyt mt-2" id="pwd" placeholder="새로 사용하실 비밀번호를 입력해주세요.">
                     <div>한 번 더 입력해주세요.</div>
                     <input type="password" class="'form-control joinInput mt-2" id="pwd2" placeholder="새로 사용하실 비밀번호를 입력해주세요.">
                     <input type="button" @click="updatePwd" class="btn btn-primary btn-default btn-sm mt-2" value="비밀번호 수정"> 
                 </div>
                 <div class="col">
                 </div>
             </div>
         </td>
     </tr>
    </table>
 </template>
<style>
#logo3{color: pink;font: italic 4em "Fira Sans", serif;}
</style>
<script>
export default {
    name: 'PageMyPage',
    data() {
        return {
            infor: {
                userId: 'user01',
                userName: '홍길동',
                userEmail: 'useremail@test.org',
                userPhone: '010-1234-5678'
            }
        };
    },
    methods: {
        updatePwd() {
            // 비밀번호 수정 로직 작성
        },
        openPhone() {
            // 전화번호 변경 로직 작성
        }
    }
};
</script>
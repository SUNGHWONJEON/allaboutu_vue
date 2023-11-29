<template>
    <h3>NOTICE</h3>
    <p>공지사항 글 수정</p>
    <form name = "articleForm" method = "post" enctype="multipart/form-data">
    <table border = "0" align = "center">
        <tr>
            <td align = "right"> 글제목 </td>
        </tr> 
        <tr>
            <td align = "right" valign = "top"><br>글내용</td>
            <td colspan= 2 ><input type = "text" size = "67" maxlength="500"
            name="title"/></td>
        
        </tr>
        <tr>
            <td align = "right">이미지파일 첨부 : </td>
            <td> <input type="file" name = "imageFileName" onchange = "readURL(this);" /></td>
            
        </tr>
        <tr>
            <td align = "right" > </td>
            <td colspan = "2">
                <input type = "submit" value="글 등록" />
                <input type= button value="목록보기" />
            </td>
        </tr>
        
    
</template>

<script>
export default {
   name:'NoticeWrite',
   
}
</script>

<style>
     
</style>
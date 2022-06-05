<template>
  <div class='article-body'>
    <div class="upload-container">
      <span>封面图片：</span>
      <div class='upload'></div>
    </div>
  </div>
</template>
<style scoped>
.upload{
  height: 100px;
  width: 100px;
  border: 1px dashed gray;
  border-radius: 5px;
  margin-left: 20px;
}
.upload:hover{
  border-color: #5a9cf8;
  cursor: pointer;
}
.upload-container{
  display: flex;
  align-items: center;
  padding-top: 20px;
}
.article-body{
  padding-left: 10px;
  padding-right: 10px;
}
</style>

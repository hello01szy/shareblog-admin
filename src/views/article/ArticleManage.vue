<template>
  <div class='article-body'>
    <el-form :model="blog" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="封面图片：" prop="pics">
          <div class='upload' @click="uploadPic">
            <span class="icon-add-span"><i class="el-icon-plus"></i></span>
          </div>
          <input
            :v-model="blog.pics"
            class="upload-input"
            ref="input"
            type="file"
            @change="handleFileUpload"
          >
      </el-form-item>
      <el-form-item label="博文标题：" prop="title">
        <el-input v-model="blog.title"></el-input>
      </el-form-item>
      <el-form-item label="标签：" prop="tag" style="text-align: left;">
        <el-select v-model="blog.tag" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      blog: {
        title: '',
        pics: [],
        tag: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入博文标题', trigger: 'blur' }
        ],
        pics: [
          { required: true, message: '请上传封面图片', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请选择标签', trigger: 'change' }
        ]
      },
      tags: []
    }
  },
  methods: {
    uploadPic () {
      this.$refs.input.click()
    },
    handleFileUpload (e) {
    }
  }
}
</script>
<style scoped>
.upload-input{
  display: none;
}
.upload{
  height: 100px;
  width: 100px;
  border: 1px dashed gray;
  border-radius: 5px;
  text-align: center;
}
.el-icon-plus{
  line-height: 100px;
  font-size: 24px;
}
.icon-add-span{
  display: inline-block;
  width: 100%;
}
.icon-add-span:hover{
  color: #5a9cf8;
}
.upload:hover{
  border-color: #5a9cf8;
  cursor: pointer;
}
.article-body{
  padding: 20px 10px 10px 30px;
}
</style>

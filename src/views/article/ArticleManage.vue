<template>
  <div class='article-body'>
    <el-form :model="blog" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="封面图片：" prop="pics">
          <div class='upload' id="upload" @click="uploadPic">
            <span v-if="!blog.cover" class="icon-add-span"><i class="el-icon-plus"></i></span>
            <el-image
              ref="elImage"
              v-else
              class="cover-style"
              :src="blog.cover"
              :preview-src-list="srcList"
              @mouseover.native="showMask(true, $event)">
            </el-image>
            <div class="mask" v-if="maskShow && blog.cover" @mouseout="showMask(false, $event)" @click.stop>
              <i class="el-icon-delete" style="color: white; font-size: 16px;" @click="delPic"></i>
              <i class="el-icon-zoom-in" style="color: white; font-size: 16px;" @click="preview"></i>
            </div>
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
      <el-form-item label="博客摘要" prop="summary">
        <el-input
          type="textarea"
          :autosize='{minRows: 4, maxRows: 6}'
          v-model="blog.summary">
        </el-input>
      </el-form-item>
      <el-form-item label="博客内容" prop="content">
        <div>
          <div id="editor" style="text-align: left; z-index: 0;"></div>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align: right">
      <el-button type="warn">取消</el-button>
      <el-button >保存为草稿</el-button>
      <el-button type="primary" @click="publish">发布</el-button>
    </div>
  </div>
</template>
<script>
import { uploadPic, createBlog } from '@/request/api.js'
import E from 'wangeditor'
export default {
  name: 'ArticleManage',
  data () {
    return {
      blog: {
        title: '',
        cover: '',
        pics: [],
        tag: '',
        summary: ''
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
        ],
        summary: [
          { required: true, message: '请选择标签', trigger: 'change' }
        ]
      },
      tags: [],
      srcList: [],
      maskShow: false
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.config.height = 600
    this.editor.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
      'indent', // 分割线
      'lineHeight', // 行高
      'splitLine' // 全屏
    ]
    this.editor.create()
  },
  methods: {
    // 发布文章
    publish () {
      this.blog.content = this.editor.txt.html()
      this.blog.content = this.blog.content.replace(/ id=".*?"/g, '')
      const dateTime = this.getCurrentDateTime()
      this.blog.publishDate = dateTime.year + dateTime.month + dateTime.day
      this.blog.publishTime = dateTime.hour + ':' + dateTime.minute + ':' + dateTime.seconds
      this.blog.author = sessionStorage.getItem('user')
      createBlog(this.blog).then(res => {
        this.$message.success('已保存')
      }).catch(error => {
        console.log(error)
      })
    },
    getCurrentDateTime () {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1) + ''
      const day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate() + ''
      const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours() + ''
      const minute = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes() + ''
      const seconds = date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds() + ''
      return {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
      }
    },
    // 删除上传了的图片
    delPic () {
      this.blog.cover = ''
      this.maskShow = false
    },
    preview () {
      this.$refs.elImage.showViewer = true
    },
    uploadPic () {
      this.$refs.input.click()
    },
    // 此处需要注意mask中子元素<i> mouseout事件的影响
    showMask (val, e) {
      if (e.type === 'mouseover' && e.target.nodeName === 'IMG') {
        this.maskShow = val
      } else if (e.type === 'mouseout') {
        if (e.target.nodeName === 'I' || e.relatedTarget.nodeName === 'I') {
        } else {
          this.maskShow = val
        }
      }
    },
    // 图片上传
    handleFileUpload (e) {
      // 图片未上传之前准备上传但是点了取消
      if (e.target.files.length === 0 && !this.blog.cover) {
        return
      }
      // 已经上传了图片
      if (this.blog.cover) {
        return
      }
      // 检查文件格式
      const fileType = e.target.files[0].name.split('.')[1]
      if (fileType !== 'jpg' && fileType !== 'png') {
        this.$message.error('仅支持jpg和png格式图片')
        return
      }
      console.log(e.target.files)
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      uploadPic(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.blog.cover = res.data.msg
        this.srcList = []
        this.srcList.push(this.blog.cover)
      }).catch(error => {
        console.log(error)
      }).finally(() => {
        e.target.value = ''
      })
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
  position: relative;
}
.cover-style{
  vertical-align: middle;
  width: 98px;
  height: 98px;
  border-radius: 5px;
  object-fit: cover;
  flex: 1;
}
.mask{
  width: 98px;
  height: 98px;
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 5px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  display: flex;
  justify-content: space-around;
  align-items: center;
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
/deep/ .el-textarea__inner{
  font-family: 'Avenir, Helvetica, Arial, sans-serif';
}
</style>

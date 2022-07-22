<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
        <template slot-scope="scope">
          <el-link type="primary" @click="jumpToArticle(scope.row.id)">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="publishDateStr"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isPublicChinese"
        label="公开"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isDraftChinese"
        label="草稿"
        width="180">
      </el-table-column>
      <el-table-column
        prop="support"
        label="点赞数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="readCount"
        label="阅读数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateArticle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteArticle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      style="margin-top: 10px"
      :page-size="8"
      :total="total"
      :current-page="currentPage"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { getArticleList } from '@/request/api.js'
import { converDateToStr } from '@/utils.js'
export default {
  name: 'Articles',
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    updateArticle (id) {
      this.$router.push({
        path: '/article/create',
        query: {
          id: id
        }
      })
    },
    // 翻页事件
    changePage (currentPage) {
      this.currentPage = currentPage
      this.getArticleList()
    },
    jumpToArticle (id) {
      window.open('http://www.baidu.com', '_blank')
    },
    getArticleList () {
      getArticleList({
        author: 'shaozy',
        pageNum: this.currentPage,
        pageSize: 8
      }).then(res => {
        this.total = res.data.data.count
        res.data.data.modelList.forEach(item => {
          item.publishDateStr = converDateToStr(item.publishDate)
          item.isPublicChinese = item.isPublic === 0 ? '不公开' : '公开'
          item.isDraftChinese = item.draft === 0 ? '已发布' : '草稿'
        })
        this.tableData = res.data.data.modelList
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getArticleList()
  }
}
</script>
<style scoped>
</style>

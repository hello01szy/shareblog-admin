<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button type="danger" :disabled='selectItems.length === 0' @click="deleteArticles">删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="title"
        show-overflow-tooltip
        label="标题">
        <template slot-scope="scope">
          <el-link type="primary" @click="jumpToArticle(scope.row.id)">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="publishDateStr"
        label="发布时间"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="isPublicChinese"
        label="公开"
        width="180"
        :filters="[{text: '公开', value: '公开'}, {text: '私密', value: '私密'}]"
        :filter-method="filterHandler"
        >
      </el-table-column>
      <el-table-column
        prop="isDraftChinese"
        label="草稿"
        width="100"
        :filters="[{text: '已发布', value: '已发布'}, {text: '草稿', value: '草稿'}]"
        :filter-method="filterHandler"
      >
      </el-table-column>
      <el-table-column
        prop="support"
        label="点赞数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="readCount"
        label="阅读数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateArticle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteArticle(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="secretArticle(scope.row.id, '1')" v-if="scope.row.isPublic === '0'">设为公开</el-button>
          <el-button type="text" size="small" @click="secretArticle(scope.row.id, '0')" v-else>设为私密</el-button>
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
import { getArticleList, deleteArticlesById, secretArticle } from '@/request/api.js'
import { converDateToStr } from '@/utils.js'
export default {
  name: 'Articles',
  data () {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      selectItems: []
    }
  },
  methods: {
    secretArticle (id, flag) {
      secretArticle({
        id: id,
        flag: flag
      }).then(res => {
        this.$message.success(res.data.msg)
        this.getArticleList()
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange (val) {
      this.selectItems = val
    },
    deleteArticles () {
      const ids = []
      this.selectItems.forEach(item => {
        ids.push(item.id)
      })
      this.deleteArticle(ids)
    },
    // 删除文章
    deleteArticle (ids) {
      if (typeof ids === 'string') {
        ids = [ids]
      }
      deleteArticlesById(ids).then(res => {
        this.getArticleList()
        this.$message.success(res.data.msg)
      }).catch(err => {
        console.log(err)
      })
    },
    filterHandler (value, row, column) {
      // eslint-disable-next-line
      const property = column['property']
      return row[property] === value
    },
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
          item.isPublicChinese = item.isPublic === '0' ? '私密' : '公开'
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

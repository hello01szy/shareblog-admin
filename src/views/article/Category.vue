<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button type="primary" size="small" @click="addCategory">新增</el-button>
        <el-button
          type="danger" size="small"
          :disabled='multipleSelection.length === 0'
          @click="batchDel">
          删除
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <template slot="empty">
        <el-empty description="暂无标签哦~"></el-empty>
      </template>
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        sortable
        align="left"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small">
            删除
          </el-button>
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
    <el-dialog
      title="添加分类"
      :visible.sync="addCategoryShow"
      width='30%'
      @closed='closed'
      :close-on-click-modal='false'
      @destroy-on-close='true'>
      <el-form :model="category" :rules="rules" ref="categoryForm">
        <el-form-item prop="name" label="分类名称" :label-width="'100'">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCategoryShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllCategory, addCategory, deleteCategory } from '@/request/api.js'
import { converDateToStr, getCurrentDateTime } from '@/utils.js'
export default {
  name: 'Category',
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      addCategoryShow: false,
      category: {
        name: '',
        id: '',
        date: ''
      },
      total: 0,
      currentPage: 1,
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.fetchAllCategory()
  },
  methods: {
    addCategory () {
      this.addCategoryShow = true
    },
    batchDel () {
      const categoryId = []
      this.multipleSelection.forEach(item => {
        categoryId.push(item.id)
      })
      deleteCategory({ ids: categoryId }).then(() => {
        this.fetchAllCategory()
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.error('删除失败')
      })
    },
    confirmAdd () {
      const date = getCurrentDateTime()
      this.category.date = `${date.year}${date.month}${date.day}`
      this.$refs.categoryForm.validate((valid) => {
        addCategory(this.category).then(res => {
          this.$message.success('操作成功')
          this.addCategoryShow = false
          this.$refs.categoryForm.resetFields()
          this.fetchAllCategory()
        })
      })
    },
    changePage (val) {
      this.currentPage = val
      this.$nextTick(() => {
        this.fetchAllCategory()
      })
    },
    editRow (index, date) {
      this.category.name = date[index].name
      this.category.id = date[index].id
      this.addCategoryShow = true
    },
    deleteRow (index, data) {
      this.$confirm('确认删除？').then(_ => {
        deleteCategory({ ids: [data[index].id] }).then(() => {
          this.$message.success('删除成功')
          this.fetchAllCategory()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(_ => {})
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    closed () {
      this.category.id = ''
      this.category.date = ''
      this.category.names = ''
    },
    fetchAllCategory () {
      getAllCategory({ page: this.currentPage - 1, pageSize: 8 }).then(res => {
        this.tableData = res.data.data.content
        this.tableData.forEach(item => {
          item.date = converDateToStr(item.date)
        })
        this.total = res.data.data.totalElements
      })
    }
  }
}
</script>
<style scoped>

</style>

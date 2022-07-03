<template>
  <div>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <el-button type="primary" size="small" @click="addTag">新增</el-button>
        <el-button type="danger" size="small" :disabled='multipleSelection.length === 0'>删除</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
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
      :total="total">
    </el-pagination>
    <el-dialog title="添加标签" :visible.sync="addTagShow" width='30%' @closed='closed'>
      <el-form :model="tag" :rules="rules" ref="tagForm">
        <el-form-item prop="name" label="标签名称" :label-width="'100'">
          <el-input v-model="tag.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTagShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addTag, getAllTags } from '@/request/api.js'
import { getCurrentDateTime, converDateToStr } from '@/utils.js'
export default {
  data () {
    return {
      tableData: [
      ],
      multipleSelection: [],
      addTagShow: false,
      tag: {
        name: '',
        id: '',
        date: ''
      },
      total: 0,
      rules: {
        name: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.fetchAllTags()
  },
  methods: {
    editRow (index, date) {
      this.tag.name = date[index].name
      this.tag.id = date[index].id
      this.addTagShow = true
    },
    fetchAllTags () {
      getAllTags().then(res => {
        this.tableData = res.data.data
        this.tableData.forEach(item => {
          item.date = converDateToStr(item.date)
        })
        this.total = this.tableData.length
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    addTag () {
      this.addTagShow = true
    },
    closed () {
      this.$refs.tagForm.resetFields()
    },
    confirmAdd () {
      const date = getCurrentDateTime()
      this.tag.date = `${date.year}${date.month}${date.day}`
      this.$refs.tagForm.validate((valid) => {
        addTag(this.tag).then(res => {
          this.$message.success('操作成功')
          this.addTagShow = false
          this.$refs.tagForm.resetFields()
          this.fetchAllTags()
        })
      })
    }
  }
}
</script>
<style scoped>
</style>

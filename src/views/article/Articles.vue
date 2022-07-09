<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="发布状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="comments"
        label="评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="readCounts"
        label="阅读数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作"
        width="180">
        <template>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Articles',
  data () {
    return {
      tableData: []
    }
  }
}
</script>
<style scoped>
</style>

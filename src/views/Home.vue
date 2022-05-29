<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button type="primary" @click="get">退出</el-button>
    <el-button type="primary" @click="get2">发送请求</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { logout, sendMsg } from '@/request/api.js'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    get () {
      logout().then(res => {
        this.$message.success('已退出')
        sessionStorage.removeItem('token')
        this.$router.replace({
          path: '/login'
        })
      })
    },
    get2 () {
      sendMsg().then(res => {
        this.$message.success('已发送')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

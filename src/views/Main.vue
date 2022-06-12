<template>
  <div class='container'>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router='true'
    >
      <el-menu-item index="/index">
        <template>
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
      <el-submenu index='article'>
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">文章管理</span>
        </template>
        <el-menu-item index="/create">
          <span slot="title">创建文章</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>
    </el-menu>
    <div class="main-body">
      <div class="head-bar">
        <i class="el-icon-s-fold expand" v-if="!isCollapse" @click="expandOrClose"></i>
        <i class="el-icon-s-unfold expand" v-else @click="expandOrClose"></i>
        <div>
          <span style="vertical-align: middle; margin-right: 20px;">
            <i class="el-icon-message" style="font-size: 22px; color: #555c63; cursor: pointer;"></i>
          </span>
          <el-avatar :size="40" :src="circleUrl" style="vertical-align: center;cursor: pointer;"></el-avatar>
          <el-dropdown trigger="click" style="margin-right: 20px;" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ loginUser }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人管理</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div style="height: calc(100% - 60px); padding-right: 20px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="height: calc(100% - 84.5px); overflow: auto;">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, getInfo } from '@/request/api.js'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      isCollapse: false,
      circleUrl: '',
      loginUser: 'zhangsan'
    }
  },
  mounted () {
    getInfo().then(res => {
      this.circleUrl = res.data.data.avatar
      this.loginUser = res.data.data.nickName
    })
  },
  methods: {
    handleOpen () {
      this.$message.info('expand')
    },
    handleClose () {
      this.$message.info('close')
    },
    expandOrClose () {
      this.isCollapse = !this.isCollapse
    },
    handleCommand (command) {
      if (command === 'profile') {
        this.$message.info('profile')
      } else {
        logout().then(res => {
          this.$message.success('已退出')
          sessionStorage.removeItem('token')
          this.$router.replace({
            path: '/login'
          })
        })
      }
    }
  }
}
</script>
<style scoped>
.container{
  display: flex;
  flex-direction: row;
  height: 100vh;
}
.el-menu-vertical-demo{
  height: 100%;
}
.main-body{
  flex: 1;
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  text-align: left;
}
.head-bar{
  height: 60px;
  box-shadow: 0px 7px 7px -7px rgba(33, 35, 38, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.expand{
  font-size: 20px;
  color: #555c63;
  cursor: pointer;
  margin-left: 4px;
}
.el-avatar{
  vertical-align: middle;
  margin-right: 4px;
}
.el-dropdown-link{
  user-select: none;
  cursor: pointer;
}
.el-breadcrumb{
  padding-top: 10px;
  padding-left: 10px;
}
</style>

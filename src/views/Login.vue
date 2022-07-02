<template>
  <div class="container">
    <div class="login-box">
      <h2>Welcome!</h2>
      <form>
          <input
            type="text"
            :class="{'login-box-input': true, 'valid_border': infoValidator.username }"
            placeholder="Username"
            @blur="notBlankCheck('username')"
            v-model="username">
          <span :class="{ 'not_blank': true, 'not_blank_show': infoValidator.username }">
            用户名为必输项
          </span>
          <input
            type="password"
            :class="{'login-box-input': true, 'valid_border': infoValidator.password }"
            placeholder="Password"
            v-model="password"
            @blur="notBlankCheck('password')">
          <span :class="{ 'not_blank': true, 'not_blank_show': infoValidator.password }">
            密码为必输项
          </span>
      </form>
      <button class="mybutton submit" value="Login" @click="clickLogin">Login</button>
    </div>
  </div>
</template>
<script>
import { login } from '@/request/api.js'
export default {
  mounted () {
    if (sessionStorage.getItem('token')) {
      this.$router.replace('/')
    }
  },
  data () {
    return {
      username: '',
      password: '',
      infoValidator: {
        username: false,
        password: false
      }
    }
  },
  methods: {
    // 非空校验
    notBlankCheck (type) {
      if (!this[type]) {
        this.infoValidator[type] = true
      } else {
        this.infoValidator[type] = false
      }
    },
    clickLogin () {
      if (this.username && this.password) {
        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        login(formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
          this.$message.success(res.data.msg)
          sessionStorage.setItem('token', res.headers.authentication)
          this.$router.push('/index')
        }).catch(err => {
          this.$message.error(err.data.msg)
        })
      } else {
        // 提示必输效果
        if (!this.username) {
          this.infoValidator.username = true
        }
        if (!this.password) {
          this.infoValidator.password = true
        }
      }
    }
  }
}
</script>
<style scoped>
  .container{
    width: 100%;
    height: 100vh;
    position: relative;
    left: 0%;
    top: 0%;
    background-image: linear-gradient(45deg, #9fbaa8, #31354c);
    color: white;
    transition: 0.4s;
  }
  .login-box{
    position: absolute;
    width: 250px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    transition: 0.4s;
  }
  .login-box form{
    text-align: center;
    color: white;
  }
  .login-box-input{
    width: 90%;
    height: 30px;
    padding: 5px;
    text-align: center;
    background-color: #ffffff28;
    border: 1px solid white;
    border-radius: 3px;
    outline: none;
    margin-top: 10px;
    color: aliceblue;
    transition: all linear 0.2s;
  }
  .valid_border{
    border-color: #f82929;
  }
  .submit{
    width: 90%;
    border: none;
    border-radius: 2px;
    margin-top: 10px;
    padding: 10px;
    color: white;
    background-color: #2c3e50;
    outline: none;
    cursor: pointer;
    transition: all linear 0.1s;
  }
  .login-btn{
    color: white;
    transition: 0.4s;
    position: absolute;
    left: 50%;
    top: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
  .not_blank{
    display: block;
    font-size: 12px;
    color: #f82929;
    text-align: left;
    padding-top: 4px;
    margin: 0 auto;
    width: 90%;
    height: 0px;
    overflow: hidden;
    transition: all linear 0.2s;
  }
  .not_blank_show{
    height: 20px;
  }
</style>

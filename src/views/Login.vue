<template>
  <div class="container">
    <div class="login-box">
      <h2>Share Blog</h2>
      <form>
          <input type="text" class="login-box-input" placeholder="Username">
          <input type="password" class="login-box-input" placeholder="Password">
          <input class="submit" type="submit" value="Login">
      </form>
    </div>
  </div>
</template>
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
    box-sizing: border-box;
    background-color: #ffffff28;
    border: 1px solid white;
    border-radius: 3px;
    outline: none;
    margin-top: 10px;
    color: aliceblue;
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
</style>

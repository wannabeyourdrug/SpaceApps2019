<template>
 <div class="login">
  <h1>{{login}}</h1>
 </div>
</template>
<script>
 export default{
  name:'login',
  data (){
   return{
    login: 'Login'
   }
  }
 }
</script>
<style scoped>
    .login {
        color: #000;
    }
</style>
<template>
 <div class="profile">
  <h1>{{profile}}</h1>
 </div>
</template>
<script>
 export default{
  name:'profile',
  data (){
   return{
    profile: 'profile'
   }
  }
 }
</script>
<style scoped>
    .profile {
        color: #fff;
    }
</style>
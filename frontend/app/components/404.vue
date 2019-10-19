<template>
 <div class="notFound">
  <h1>{{notFound}}</h1>
 </div>
</template>
<script>
 export default{
  name:'404',
  data (){
   return{
    notFound: '404'
   }
  }
 }
</script>
<style scoped>
    .notFound {
        color: #fff;
    }
</style>
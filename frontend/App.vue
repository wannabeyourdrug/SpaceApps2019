<template>
    <div id="app">
        
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="css">
    #root {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        background-repeat: repeat;
    }
</style>
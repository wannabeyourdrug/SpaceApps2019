<template>
    <div id="root">
        <h1>App</h1>
	    <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="css">
    #root {
        color: #fff;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        background-repeat: repeat;
    }
</style>
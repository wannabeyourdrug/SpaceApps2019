<template>
    <div id="root">
        <background />
        <navbar />
	    <router-view></router-view>
    </div>
</template>

<script>
    import Background from './app/components/Background.vue';
    import Navbar from './app/components/NavBar.vue';

    export default {
        name: 'App',
        components: {
            Background,
            Navbar
        }
    }
</script>

<style lang="css" scoped>
    #root {
        color: #fff;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>
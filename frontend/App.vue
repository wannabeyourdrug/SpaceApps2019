<template>
    <div id="root">
        <background />
        <navbar />
        <div id="content">
	        <router-view></router-view>
        </div>
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

<style lang="css">
    #root {
        color: #fff;
        height: 100vh;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;

        overflow: hidden;
    }

    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    #content > div {
        padding: 15px;
        border-radius: 15px;
    }

    .bg {
        background: rgba(44, 44, 44, 0.44);
    }
</style>
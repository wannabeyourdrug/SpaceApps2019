<template>
    <nav class="nav">
        <input class="nav__check" type="checkbox" id="showmenu"/>
        <label class="nav__showmenu" for="showmenu">&#9776;</label>
        <div class="menu">
            <div class="top">
                <ul>
                    <li>
                        <a class="menu__item" href="#">Systems</a>
                        <input class="menu__check" type="checkbox" id="menu2">
                        <label class="menu__showsub" for="menu2">&#9660;</label>
                        <ul class="menu__submenu">
                            <template v-if="loading">
                                <li><span class="menu__item">Loading</span></li>
                            </template>
                            <template v-else>
                                <li v-for="star in stars">
                                    <a class="menu__item" :href="star.star_id">{{ star.name }}</a>
                                </li>
                            </template>
                        </ul>
                    </li>
                    <li>
                        <a href="#/system/new" class="menu__item">New system</a>
                    </li>
                </ul>
            </div>
            <div class="bot">
                <ul>
                    <!-- <li><a href="#/profile" class="menu__item">Profile</a></li>
                    <li><a href="#/login" class="menu__item">LogOut</a></li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import api from '../helpers/api';

export default {
    name: "navbar",
    data() {
        return {
            loading: false,
            stars: []
        } 
    },
    mounted() {
        this.getDataFromApi();
    },
    methods: {
        getDataFromApi() {
            this.loading = true
            api('system/getList').then(data => {
                this.stars = data.map(star => [star.star_id = '#/system/' + star.star_id, star][1]);
                this.loading = false;
            });
        }
    }
}
</script>

<style scoped>
    input {display: none;}
    label {cursor: pointer;}

    .nav {user-select: none;}

    .menu>li:first-child {
        margin-top: 2vh;
    }

    .nav__showmenu {
        position: relative;
        z-index: 3;
        display: inline-block;
        margin-left: -10px;
        padding: 5px 10px 10px;
        top: 2px;
        font-size: 23px;
        left: 15px;
    }

    .menu ul, .menu__submenu ul{
        list-style: none;
        padding: 0;
        color: #fff;
        overflow: hidden;
    }

    .menu {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: 220px;
        height: 100vh;
        margin: 0;
        padding: 17px 0;
        text-transform: uppercase;
        line-height: 2em;
        background-color: #2c2c2c;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        transform: translateX(-100%);
        transition: transform .3s;
        will-change: transform;
        backface-visibility: hidden;
    }

    .menu .bot {
        position: absolute;
        bottom: 5vh;
        width: 100%;
    }

    .menu__submenu {
        font-size: .8em;
        background-color: #ddd;
        max-height: 0;
        transition: max-height .3s ease-in-out;
    }

    .menu__showsub {
        position: absolute;
        right: 0;
        margin-top: -34px;
        padding: 10px;
        line-height: normal;
    }

    .menu__item {  
        display: block;
        text-align: center;
        text-decoration: none;
        color: #fff;
    }

    .menu__submenu .menu__item {color: #000;}

    .nav__check:checked~.nav__back {
        background-color: rgba(0,0,0,.2);
        bottom: 0;
    }

    .menu__item:hover,.nav__showmenu:hover,.menu__showsub:hover {opacity: 0.7;}
    .menu::-webkit-scrollbar {display: none;}
    .nav__check:checked+.nav__showmenu {color:#fff;}
    .menu__check:checked~.menu__submenu {max-height: 100vh;}
    .menu__check:checked+.menu__showsub {transform: rotate(180deg);}
    .nav__check:checked~.menu {transform: translateX(0);}
</style>
<template>
    <div class="system">
        <template v-if="loading">
            <span>Loading...</span>
        </template>
        <template v-else>
            <ul class="starSystem">
                <li id="star" :class="star.class">
                    <a href="#star">
                        <span> {{ star.name }} </span>
                    </a>
                </li>
                <li v-for="planet in planets" class="planet" :style="planet.style" :data-id="planet.planet_id" @mouseenter="mouseenter" @mouseleave="mouseleave">
                    <a href="#">
                        <span :style="planet.color">
                            {{ planet.planet_id }}
                        </span>
                    </a>
                </li>
            </ul>

            <div class="tooltip bg">
                <div v-for="planet in planets" class="tooltip__data" :data-id="planet.planet_id">
                    <ul>
                        <li>Радиус: {{ planet.radius }}</li> 
                        <li>Масса: {{ planet.mass }}</li>
                        <li>Орбитальный радиус: {{ planet.orbit }}</li> 
                        <li>Скорость движения по орбите: {{ planet.ms }}</li>
                        <li>Время оборота вокруг своей оси: {{ planet.rs }}</li>    
                        <li>Наклон оси вращения: {{ planet.angle }}</li>
                        <li>Атмосферное давление: {{ planet.ad }}</li>
                    </ul>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import api from '../helpers/api';

export default {
    name: "system",
    props: {
        uuid: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            star: {},
            planets: []
        } 
    },
    created() {
        this.getDataFromApi();
    },
    methods: {
        getDataFromApi() {
            this.loading = true
            api('system/load/' + this.uuid).then(data => {
                let wh = 100;
                let top = -20;
                let left = 3;
                let topPlanet = 20;
                let zindex = 99; 
                for (let key in data.planets) {
                    data.planets[key].color = 'background: ' + this.getPlanetColor(data.planets[key].orbit, data.planets[key].type) + '; top: ' + topPlanet + 'px;';
                    data.planets[key].style = 'height: ' + wh + 'px; width: ' + wh + 'px;' + '-moz-animation-duration: ' + (data.planets[key].ms * 3) + 's;'
                        + 'left: ' + left + 'px; top: ' + top + 'px; z-index: ' + zindex;
                    wh += 60;
                    top -= 30;
                    left -= 29;
                    topPlanet += 26;
                    zindex -= 1;
                }
                data.star.class = 'planet ' + this.getStarClass(data.star.temp);
                this.star = data.star;
                this.planets = data.planets;
                this.loading = false;
            });
        },

        getPlanetColor(orbit, type) {
            if (type == 2) return Math.random() > 0.5 ? '#77c2ec' : '#e0ae6f';
            
            let ao = orbit / ( 1.496 * 1e8 );
            
            if ( ao >= 0.35 && ao < 0.8 ) return Math.random() > 0.5 ? '#b6bac5' : '#bf8639';
            if ( ao >= 0.8 && ao < 1.2 ) return '#06c';
            if ( ao >= 1.2 && ao < 2 )  return '#aa4200';
            if ( ao >= 2 && ao < 12 )return Math.random() > 0.5 ? '##7c6a5c' : '#77c2ec';

            const rc = () => Math.floor(Math.random() * 255).toString(16);
            return '#' + rc() + rc() + rc();
        },

        getStarClass(temp) {
            if( temp >= 2000 && temp < 3500 ) return 'M';
            if( temp >= 3500 && temp < 5000 ) return 'K';
            if( temp >= 5000 && temp < 6000 ) return 'G';
            if( temp >= 6000 && temp < 10000 ) return 'AF';
            if( temp >= 10000 && temp < 30000 ) return 'B';
            if( temp >= 30000 && temp <= 60000 ) return 'O';
        },

        mouseenter(ev) {
            let uuid = ev.target.getAttribute('data-id');
            document.querySelector(`.tooltip__data[data-id="${uuid}"]`).classList.add('tooltip__visible');
        },
        mouseleave(ev) {
            let uuid = ev.target.getAttribute('data-id');
            document.querySelector(`.tooltip__data[data-id="${uuid}"]`).classList.remove('tooltip__visible');
        }
    },
    watch: {
        '$route.params.uuid'() {
            this.getDataFromApi();
        }
    }
}
</script>

<style scoped>
    #star {
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 20px;
        z-index: 100;
    }

    .tooltip {
        position: fixed;
        width: 22vw;
        top: 40%;
        right: -43vw;
        transform: translate(0, -50%);
        display: block;
        z-index: 1000;
    }
    .tooltip .tooltip__data {
        position: relative;
        top: 0;
        left: 0;
        display: none;
    }

    .tooltip .tooltip__visible {
        display: block;
    }

    .system {
        display: block;
        position: relative;
    }
    
    .planet span {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }

    .planet {
        text-indent: -9999px;
        display: block;
        position: absolute;
        border: 2px solid #394057;

        
        transform: translate(-50%, -50%);
        /* opacity: 0.7; */

        -webkit-animation-iteration-count:infinite;
        -webkit-animation-timing-function:linear;
        -webkit-animation-name:orbit;
        
        -moz-animation-iteration-count:infinite;
        -moz-animation-timing-function:linear;
        -moz-animation-name:orbit;

        border-radius: 50%;
    }
 
    .planet:hover {
        border-color: red;
    }

    .M {
        background: #FFA040;
    }

    .K {
        background: #FFE46F;
    }

    .G {
        background: #FFE46F;
    }

    .AF {
        background: #F8F7FF;
    }

    .B {
        background: #CAD7FF;
    }

    .O {
        background: #AABFFF;
    }

    @-webkit-keyframes orbit { from { -webkit-transform:rotate(0deg) } to { -webkit-transform:rotate(360deg) } }
    @-webkit-keyframes moon { from { -webkit-transform:rotate(0deg) } to { -webkit-transform:rotate(360deg) } }

    @-moz-keyframes orbit { from { -moz-transform:rotate(0deg) } to { -moz-transform:rotate(360deg) } }
    @-moz-keyframes moon { from { -moz-transform:rotate(0deg) } to { -moz-transform:rotate(360deg) } }
</style>
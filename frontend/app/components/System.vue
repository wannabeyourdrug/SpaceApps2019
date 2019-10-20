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
                <li v-for="planet in planets" :class="planet.planet_id" :style="planet.style">
                    <a href="#">
                        <span :style="planet.color">
                            {{ planet.planet_id }}
                        </span>
                    </a>
                </li>
            </ul>
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
                data.star.class = this.getStarClass(data.star.temp);
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

    .system {
        display: block;
        position: relative;
    }
    
    ul.starSystem li span {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }

    ul.starSystem li {
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
 
    ul.starSystem li:hover {
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
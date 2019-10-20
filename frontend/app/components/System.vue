<template>
    <div class="system">
        <template v-if="loading">
            <span>Loading...</span>
        </template>
        <template v-else>
            <ul class="starSystem">
                <li id="star" :class="star.class" :data-id="uuid" @mouseenter="mouseenter" @mouseleave="mouseleave">
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
                <div class="tooltip__data" :data-id="uuid">
                    <h3>{{ star.name }}</h3>
                    <ul>
                        <li>Радиус: {{ star.radius }}, м</li> 
                        <li>Масса: {{ star.mass }}, кг</li>
                        <li>Температура: {{ star.temp }}, К</li> 
                        <li>Зона обитаемости: {{ number_format(star.chz, 2, '.', '') }}, а.е.</li>
                    </ul>
                </div>
                <div v-for="planet in planets" class="tooltip__data" :data-id="planet.planet_id">
                    <ul>
                        <li>Радиус: {{ number_format(planet.radius, 4, '.', '') }}, км</li> 
                        <li>Масса: {{ number_format(planet.mass / 1e27, 4, '.', '') }}e+27, кг</li>
                        <li>Орбитальный радиус: {{ number_format(planet.orbit / 1e10, 4, '.', '') }}e+10, км</li> 
                        <li>Скорость движения по орбите: {{ number_format(planet.ms, 2, '.', '') }}, км/с</li>
                        <li>Время оборота вокруг своей оси: {{ number_format(planet.rs, 2, '.', '') }}, ч</li>    
                        <li>Наклон оси вращения: {{ number_format(planet.angle, 1, '.', '') }}°</li>
                        <li>Атмосферное давление: {{ number_format(planet.ad, 4, '.', '') }}, атм</li>
                    </ul>
                </div>
            </div>

            <div class="destroy">
                <h3>
                    <a href="#" @click="destroy">
                        Destroy&nbsp;star
                    </a>
                </h3>
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
                data.planets = data.planets.sort( (a, b) => {
                    return a.orbit - b.orbit;
                })
                let wh = 100;
                let top = -20;
                let left = 3;
                let topPlanet = 20;
                let zindex = 99; 
                for (let key in data.planets) {
                    data.planets[key].color = 'background: ' + this.getPlanetColor(data.planets[key].orbit, data.planets[key].type) + '; top: ' + topPlanet + 'px;';
                    data.planets[key].style = 'height: ' + wh + 'px; width: ' + wh + 'px;' + '-moz-animation-duration: ' + (1 / data.planets[key].ms * 600) + 's;'
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
        },
        destroy(ev) {
            ev.preventDefault();
            api('system/destroy/' + this.uuid).then(_ => {
                window.location.replace('/#/');
            });
            return false;
        },

        number_format(number, decimals, dec_point, thousands_sep) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
    },
    watch: {
        '$route.params.uuid'() {
            this.getDataFromApi();
        }
    }
}
</script>

<style scoped>
    .destroy {
        position: fixed;
        top: 20vw;
        left: 40vw;
    }
    .destroy a {
        text-decoration: none;
        color: #fff;
        padding: 10px;
        border-radius: 15px;
    }
    .destroy a:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

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
    .tooltip .tooltip__data h3 {
        text-align: center;
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
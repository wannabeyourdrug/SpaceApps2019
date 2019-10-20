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
                <li v-for="planet in planets" :class="planet.planet_id">
                    <a href="#">
                        <span :style="planet.style">
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
    mounted() {
        
        function createStar( temp ) {
            let elem = document.querySelector('star');

            if( temp >= 2000 && temp < 3500 )
                elem.style.background = '#FFA040'
        }

        this.getDataFromApi();
    },
    methods: {
        getDataFromApi() {
            this.loading = true
            api('system/load/' + this.uuid).then(data => {
                let wh = 100;
                let top = 270;
                let left = 430;
                let br = 52;
                for (let key in data.planets) {
                    data.planets[key].style = 'background: ' + this.getPlanetColor(data.planets[key].orbit, data.planets[key].type)
                        + '; height: ' + sum + 'px; width: ' + sum + 'px; top: ' + top + 'px; left: ' + left 
                        + 'px; border-radius: ' + br + 'px;';
                    sum += 60;
                    left -= 30;
                    top -= 30;
                    br += 30;
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
        },

        getStarClass(temp) {
            if( temp >= 2000 && temp < 3500 ) return 'M';
            if( temp >= 3500 && temp < 5000 ) return 'K';
            if( temp >= 5000 && temp < 6000 ) return 'G';
            if( temp >= 6000 && temp < 10000 ) return 'AF';
            if( temp >= 10000 && temp < 30000 ) return 'B';
            if( temp >= 30000 && temp < 60000 ) return 'O';
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
    }

    ul.starSystem li span {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 5px;
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
</style>
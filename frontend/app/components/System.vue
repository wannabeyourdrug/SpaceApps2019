<template>
    <div class="system">
        <template v-if="loading">
            <span>Loading...</span>
        </template>
        <template v-else>
            <ul class="starSystem">
                <li class="star">
                    <a href="#star">
                        <span> {{ star.name }} </span>
                    </a>
                </li>
                <li v-for="planet in planets" :class="planet.planet_id">
                    <a href="#">
                        <span>
                            {{ planet.planet_id }}
                        </span>
                    </a>
                </li>
            </ul>  
        </template>
    </div>
</template>

<script>
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
        this.getDataFromApi();
    },
    methods: {
        getDataFromApi() {
            this.loading = true
            api('system/load/' + this.uuid).then(data => {
                this.star = data.star;
                this.planets = data.planets;
                this.loading = false;
            });
        }
    }
}
</script>

<style scoped>

</style>
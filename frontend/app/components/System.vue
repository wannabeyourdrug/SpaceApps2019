<template>
    <div class="system">
        <ul class="starSystem">
            <li class="star">
                <a href="#star">
                    <span> {{ star.name }} </span>
                </a>
            </li>
            <li v-for="planet in planets" class={{ planet.name }}>
                <a href="#">
                    <span>
                        {{ planet.name }}
                    </span>
                </a>
            <li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "system",
    mounted: () => {
        
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="workbench bg">
        <h1>Workbench</h1>
        <form>

        </form>
    </div>
</template>
<script>
    import RangeSlider from 'vue-range-slider'
    // you probably need to import built-in style
    import 'vue-range-slider/dist/vue-range-slider.css'
    
    export default {
        name:'workbench',
        data () {
            return {
                sliderValue: 50
            }
        },
        components: {
            RangeSlider
        }
    }
</script>
<style scoped>
</style>
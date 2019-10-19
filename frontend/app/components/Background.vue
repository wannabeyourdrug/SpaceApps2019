<template>
    <canvas id="background"></canvas>
</template>

<script>
    export default {
        name: 'background',
        mounted: () => {
            var c = document.getElementById('background');
            var ctx = c.getContext('2d');
            var x = c.width = window.innerWidth;
            var y = c.height = window.innerHeight;
            var nStar = Math.round((x + y) / 5);
            var randomSize = Math.floor((Math.random() * 2) + 1);

            var stars = [];

            function createStars() {
                'use strict';
                stars = [];
                for (var i = 0; i <= nStar; i++) {
                    stars.push({
                        x: Math.random() * x,
                        y: Math.random() * y,
                        o: Math.random(),
                        r: Math.random(),
                        s: 0.02,
                    })
                    if (randomSize > .1) {
                        ctx.shadowBlur = Math.floor((Math.random() * 15));
                        ctx.shadowColor = "white";
                    }
                }
            }

            function drawing() {
                'use strict';
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                for (var i = 0; i <= nStar; i++) {
                    var e = stars[i];
                    if (e.o > 1 || e.o < 0) {
                        e.s = -e.s;
                    }
                    e.o += e.s;
                    ctx.beginPath();
                    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2, false);
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + e.o + ')';
                    ctx.stroke();
                }
                // requestAnimationFrame(drawing);
            }

            createStars();
            drawing();
        }
    }
</script>

<style lang="css" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    #background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1000;
        background: linear-gradient(#00111e 30%, #033d5e);
        vertical-align: bottom;
        height: 100vh;
        width: 100%;
    }
</style>
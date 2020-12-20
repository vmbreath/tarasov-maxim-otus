<template>
    <div>
        <div class="limits">
            <div class="min">{{min}}</div>
            <div>{{max}}</div>
        </div>
        <input type="range" v-bind:min=min v-bind:max=max v-on:change="setCurrentDuration" v-bind:value="value"
               class="slider">
        <p>{{text}}{{value}}</p>
    </div>
</template>

<script>


    export default {
        name: 'Slider',
        props: {
            max: Number,
            min: Number,
            value: Number,
            method: String,
            text: String
        },
        data() {
            return {
                // durationMax:15,
                // durationMin:1
            }
        },
        methods: {
            setCurrentDuration(ev) {
                this.$store.commit(this.method, ev.target.value)
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .slider {
        min-width: 40vw;
    }

    .limits {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .min {
        margin-right: 38vw;
    }
</style>

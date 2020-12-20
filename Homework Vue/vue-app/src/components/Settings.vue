<template>
  <div class="container">
    <div class="border border-3">
      <div class="settings">
        <img class="animate__animated animate__rubberBand settingsLogo" alt="Settings" src="./settings.png">
        <h3 style="margin-bottom: 0">Настройки</h3>
      </div>
      <Slider v-bind:min=1 v-bind:max=15 v-bind:value=+this.$store.state.duration method="setDuration"
              v-bind:text="textDurationSlider"/>
      <Slider v-bind:min=1 v-bind:max=10 v-bind:value=+this.$store.state.level method="setLevel"
              v-bind:text="textLevelSlider"/>
      <div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-on:change="setSum" v-bind:checked=this.$store.state.sum
                 id="flexCheckSum">
          <label class="form-check-label" for="flexCheckSum">
            Суммирование
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-on:change="setSubtraction"
                 v-bind:checked=this.$store.state.subtraction id="flexCheckSubtraction">
          <label class="form-check-label" for="flexCheckSubtraction">
            Разность
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-on:change="setMultiplication"
                 v-bind:checked=this.$store.state.multiplication id="flexCheckMultiplication">
          <label class="form-check-label" for="flexCheckMultiplication">
            Умножение
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-on:change="setDivide"
                 v-bind:checked=this.$store.state.divide id="flexCheckDivide">
          <label class="form-check-label" for="flexCheckDivide">
            Деление
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapMutations } from 'vuex';
  import Slider from "./Slider";

  export default {
    name: 'Settings',
    props: {},
    components: {
      Slider
    },
    data() {
      return {
        textDurationSlider: 'Текущее время на упражнение (минуты): ',
        textLevelSlider: 'Текущий уровень сложности: '
      }
    },
    methods: {
      setSum(ev) {
        this.$store.commit('setSum', ev.target.checked)
      },
      setSubtraction(ev) {
        this.$store.commit('setSubtraction', ev.target.checked)
      },
      setMultiplication(ev) {
        this.$store.commit('setMultiplication', ev.target.checked)
      },
      setDivide(ev) {
        this.$store.commit('setDivide', ev.target.checked)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-check {
    display: flex;
    justify-content: center;
  }

  .form-check-label {
    margin-left: 1%;
  }

  div p {
    margin: 1%;
  }

  .settings {
    background: linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 98.39%), #C4C4C4;
    border: 1px solid #958D8D;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  .settingsLogo {
    width: 4vw;
    margin-right: 1vw;
  }
</style>

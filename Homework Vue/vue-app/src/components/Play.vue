<template>
  <div>
    <div v-show="isActive" class="container">
      <div class="timer">
        <p>Оставшееся время: |{{this.getMinutes}}:{{this.getSeconds}}|</p>
        <div class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75"
               aria-valuemin="0" aria-valuemax="100" :style=getPercents></div>
        </div>
      </div>
      <div>
        <h3>{{this.number1}} {{this.sign}} <u>{{this.answer}}</u> = {{this.result}}</h3>
      </div>
      <div class="btn-toolbar mb-3 buttons" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group me-2" role="group" aria-label="First group">
          <button type="button" v-on:click="addToAnswer(1)" class="btn btn-secondary">1</button>
          <button type="button" v-on:click="addToAnswer(2)" class="btn btn-secondary">2</button>
          <button type="button" v-on:click="addToAnswer(3)" class="btn btn-secondary">3</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" v-on:click="addToAnswer(4)" class="btn btn-secondary">4</button>
          <button type="button" v-on:click="addToAnswer(5)" class="btn btn-secondary">5</button>
          <button type="button" v-on:click="addToAnswer(6)" class="btn btn-secondary">6</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" v-on:click="addToAnswer(7)" class="btn btn-secondary">7</button>
          <button type="button" v-on:click="addToAnswer(8)" class="btn btn-secondary">8</button>
          <button type="button" v-on:click="addToAnswer(9)" class="btn btn-secondary">9</button>
        </div>
        <div class="btn-group me-2" role="group" aria-label="Second group">
          <button type="button" v-on:click="removeFromAnswer()" class="btn btn-secondary">←</button>
          <button type="button" v-on:click="addToAnswer(0)" class="btn btn-secondary">0</button>
          <button type="button" v-on:click="showAnswer" class="btn btn-secondary">?</button>
        </div>
      </div>
    </div>
    <div class="end" v-show="!isActive">
      <h2>Время вышло!</h2>
      <img class="settingsLogo" alt="Settings" src="./timeIsUp.gif">
      <button type="button" v-on:click="start" class="btn btn-primary">Начать заново?</button>
    </div>
    <h3 v-show="success" class="animate__animated animate__lightSpeedInLeft success">Красавчик!</h3>
  </div>
</template>

<script>
  export default {
    name: 'Play',
    props: {},
    data() {
      return {
        timeCounter: this.$store.state.duration * 60,
        isActive: true,
        number1: 2,
        number2: 2,
        operation: '+',
        result: 4,
        sign: '',
        answer: '???',
        success: false,
      }
    },
    mounted() {
      this.$store.commit('setLastSolved', this.$store.state.lastSolved = 0);
      this.startInterval();
      this.doRandom();
      this.doRandomOperation();
      this.getResult();
    },
    beforeDestroy() {
      this.$store.commit('setLastExercise');
    },
    methods: {
      doRandom() {
        this.number1 = Math.floor(Math.random() * Math.floor(this.$store.state.level * 100));
        this.number2 = Math.floor(Math.random() * Math.floor(this.$store.state.level * 100));
      },
      doRandomOperation() {
        this.operation = Math.ceil(Math.random() * Math.floor(4));
      },
      getResult() {
        if (this.operation === 1) {
          this.sign = '+';
          this.result = this.number1 + this.number2
        } else if (this.operation === 2) {
          this.sign = '-';
          this.result = this.number1 - this.number2
        } else if (this.operation === 3) {
          this.sign = '*';
          this.result = this.number1 * this.number2
        } else if (this.operation === 4) {
          this.sign = '/';
          this.result = this.number1 / this.number2
        }
      },
      newExample(success) {
        this.success = success;
        if (success) {
          this.$store.commit('setLastSolved', this.$store.state.lastSolved = this.$store.state.lastSolved + 1);
          this.$store.commit('setSolved');
        } else {
          this.$store.commit('setMiss');
        }
        setTimeout(() => this.success = false, 2000)
        this.answer = '???';
        this.doRandom();
        this.doRandomOperation();
        this.getResult();
      },
      addToAnswer(number) {
        if (this.answer === '???') {
          this.answer = ''
        }
        this.answer = this.answer + number;
        if (Number(this.answer) === this.number2) {
          this.newExample(true);
        }
      },
      removeFromAnswer() {
        this.answer = this.answer.slice(0, -1);
      },
      showAnswer() {
        this.answer = this.number1;
        setTimeout(() => this.newExample(false), 2000)
      },
      start() {
        this.isActive = true;
        this.timeCounter = this.$store.state.duration * 60;
        this.startInterval();
        this.doRandom();
        this.doRandomOperation();
        this.getResult();
      },
      startInterval() {
        this.interval = setInterval(() => {
          if (this.timeCounter === 0) {
            clearInterval(this.interval);
            this.isActive = false;
          } else {
            this.timeCounter--;
          }
        }, 1000)
      }
    },
    computed: {
      getMinutes() {
        return Math.floor(this.timeCounter / 60)
      },
      getSeconds() {
        return this.timeCounter % 60
      },
      getPercents() {
        return `width: ${100 - Math.floor(this.timeCounter * 100 / (this.$store.state.duration * 60))}%`
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .btn-toolbar {
    display: flex;
    flex-direction: column;
    margin: 3%;
  }

  .btn-group {
    margin: 1%;
  }

  .progress {
    min-width: 20vw;
  }

  .end {
    display: flex;
    flex-direction: column;
    margin: 3%;
  }

  .success {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  }
</style>

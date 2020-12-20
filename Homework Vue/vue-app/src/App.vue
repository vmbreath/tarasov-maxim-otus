<template>
  <div id="app">
    <nav class="links">
      <router-link tag="div" to="/">Home</router-link>
      <router-link tag="div" to="/settings">Settings</router-link>
      <router-link tag="div" to="/play">Play</router-link>
    </nav>
    <img class="animate__animated animate__rubberBand" alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>
<script>

  export default {
    name: 'App',
    components: {},
    beforeCreate() {
      if (localStorage.getItem('game') !== null) {
        this.$store.commit('loadLocalStorage');
      }
      this.$store.commit('checkDay');
    },

  }

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 1200px) {
    #app {
      max-width: 970px;
    }
  }

  @media (max-width: 992px) {
    #app {
      max-width: 750px;
    }
  }

  @media (max-width: 767px) {
    #app {
      max-width: none;
    }
  }

  img {
    max-width: 30vw;
  }

  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  nav div {
    background: linear-gradient(180deg, #E3F237 0%, rgba(229, 243, 66, 0.942708) 2.25%, rgba(228, 243, 63, 0.958333) 4.51%, rgba(255, 255, 255, 0) 108.22%), linear-gradient(180deg, #F7DF0B 0%, rgba(255, 255, 255, 0) 100%);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 30%;
    font-size: large;
    padding: 2%;
    margin: 2%;
  }

  nav div:hover {
    background-color: #c11cc4;
    cursor: pointer;
    animation: jello; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 1s; /* don't forget to set a duration! */
  }


</style>

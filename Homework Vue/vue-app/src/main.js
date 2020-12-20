import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import {store} from "./store/store"
import throttle from 'lodash/throttle'
import {saveState} from "./components/localStorage";


Vue.config.productionTip = false

store.subscribe(throttle((mutation, state) => {
  saveState({
    state: state,
  }, 'game')
}, 1000))

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

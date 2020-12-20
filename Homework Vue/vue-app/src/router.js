import Vue from "vue";
import VueRouter from "vue-router";
import Settings from "./components/Settings";
import Play from "./components/Play";
import Home from "./components/Home";

Vue.use(VueRouter);

const routes = [
    {path: '/settings', component: Settings},
    {path: '/play', component: Play},
    {path: '/', component: Home},
]
const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;
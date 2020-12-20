import Vuex from 'vuex'
import Vue from "vue";
import {loadState} from "../components/localStorage";

Vue.use(Vuex);
export const store = new Vuex
    .Store({
        state: {
            duration: 5,
            level: 5,
            sum: true,
            subtraction: true,
            multiplication: true,
            divide: true,
            days: 0,
            lastSolved: 0,
            lastTime: 5,
            lastLevel: 5,
            solved: 0,
            misses: 0,
            date: [12, 12, 2000]
        },
        getters: {
            getNews: state => {
                return state;
            },
            isLoggedIn: state => {
                return state;
            }
        },
        mutations: {
            setNews(state, news) {
                state.newsList = news
            },
            setDuration(state, duration) {
                state.duration = duration;
            },
            setLevel(state, level) {
                state.level = level;
            },
            setSum(state, sum) {
                state.sum = sum;
            },
            setSubtraction(state, subtraction) {
                state.subtraction = subtraction;
            },
            setMultiplication(state, multiplication) {
                state.multiplication = multiplication;
            },
            setDivide(state, divide) {
                state.divide = divide;
            },
            setLastSolved(state, lastSolved) {
                state.lastSolved = lastSolved;
            },
            setLastExercise(state) {
                state.lastTime = state.duration;
                state.lastLevel = state.level;
            },
            setSolved(state) {
                state.solved = state.solved + 1;
            },
            setMiss(state) {
                state.misses = state.misses + 1;
            },
            saveLocalStorage(state) {
                localStorage.setItem('state', state);
            },
            loadLocalStorage(state) {
                for (let elem in state) {
                    state[`${elem}`] = loadState('game').state[`${elem}`];
                }
            },
            checkDay(state) {
                if (localStorage.getItem('game')) {
                    if (new Date().getDate() !== state.date[0] && new Date().getMonth() !== state.date[1] && new Date().getFullYear() !== state.date[2]) {
                        state.date[0] = new Date().getDate();
                        state.date[1] = new Date().getMonth();
                        state.date[2] = new Date().getFullYear();
                        state.days = state.days + 1;
                    }
                } else {
                    state.days = 1;
                    state.date[0] = new Date().getDate();
                    state.date[1] = new Date().getMonth();
                    state.date[2] = new Date().getFullYear();
                }

            }
        }
    });

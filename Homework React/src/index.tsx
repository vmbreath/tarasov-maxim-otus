import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import {Provider} from 'react-redux';
import store from "./store";
import {loadState, saveState} from "./localStorage";
import throttle from "lodash/throttle";


// const reducer = combineReducers({
//     weather: searchWeatherReducer,
//     towns: townsReducer,
// });
//
//     const persistedState = loadState('state');
//     store = createStore(reducer, persistedState);

store.subscribe(throttle(() => {
    saveState({
        state: store.getState()
    }, 'reducer')
}, 1000))


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById("root"));

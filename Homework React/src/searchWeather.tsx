import {createSlice} from '@reduxjs/toolkit';
import {loadState} from './localStorage'

const persistedState = loadState('reducer');

export const initialState = persistedState ? persistedState.state.weather : ({
    response: {list: []},
    fiveDaysForecast: []
});


export const currentWeather = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeather: (state, action) => {
            state.response = action.payload;
            state.fiveDaysForecast = [];
            state.response.list.forEach((list, index) => {
                if (index % 8 === 0) {
                    state.fiveDaysForecast.push(list);
                }
            })
        },
    },
});

export const {setWeather} = currentWeather.actions;
export const getWeather = state => state.weather.response;
export const getFiveDaysForecast = state => state.weather.fiveDaysForecast;
export const fetchWeather = (town: string) => async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&lang=ru&appid=9d15fd722b6f2c64840bfdbc040e6975`
    const response = await fetch(url).then(response => response.json());
    dispatch(setWeather(response));
}
export const {reducer, actions} = currentWeather;
export default currentWeather.reducer;
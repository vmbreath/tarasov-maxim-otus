import {configureStore} from '@reduxjs/toolkit';
import searchWeatherReducer from './searchWeather';
import townsReducer from './currentTowns';

export default configureStore({
  reducer: {
    weather: searchWeatherReducer,
    towns: townsReducer,
  },
});


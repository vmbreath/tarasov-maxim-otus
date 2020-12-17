import {createSlice} from '@reduxjs/toolkit';
import {loadState} from './localStorage'

const persistedState = loadState('reducer');

export const initialState = persistedState ? persistedState.state.towns : ({
    town: 'Москва',
    towns: ['Москва'],
});

export const currentTowns = createSlice({
    name: 'towns',
    initialState,
    reducers: {
        pushNewName: (state, action) => {
            if (!state.towns.includes(state.town)) {
                state.towns.push(state.town);
            }
        },
        deleteName: (state, action) => {
            const index = state.towns.indexOf(action.payload)
            state.towns.splice(index, 1);
        },
        setNewName: (state, action) => {
            state.town = action.payload;
        },
    },
});

export const {pushNewName, deleteName, setNewName} = currentTowns.actions;
export const selectTowns = state => state.towns.towns;
export const selectTown = state => state.towns.town;
export default currentTowns.reducer;
export const {reducer, actions} = currentTowns;
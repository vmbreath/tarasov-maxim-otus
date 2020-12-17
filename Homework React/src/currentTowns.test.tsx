import {reducer, actions} from "./currentTowns";

const initialState = {
    town: 'Дубай',
    towns: ['Москва'],
};
describe("currentTowns reducer", () => {
    it("it should push new name", () => {
        expect(reducer({...initialState}, actions.pushNewName(''))).toEqual({
            "town": "Дубай",
            "towns": [
                "Москва",
                "Дубай"
            ]
        });
    });
    it("it should delete name", () => {
        expect(reducer({...initialState}, actions.deleteName('Москва'))).toEqual({
            "town": "Дубай",
            "towns": []
        });
    });
    it("it should set name", () => {
        expect(reducer({...initialState}, actions.setNewName('Москва'))).toEqual({
            "town": "Москва",
            "towns": ['Москва']
        });
    });
});
import {reducer, actions, setWeather, initialState} from "./searchWeather";

describe("searchWeather reducer", () => {
    it("it should set correct weather", () => {
        setWeather({list: ['weather1', 'weather2']})
        expect(reducer({...initialState}, actions.setWeather({
            "list": [
                "weather1",
                "weather2"
            ]
        }))).toEqual({
            "fiveDaysForecast": [
                "weather1"
            ],
            "response": {
                "list": [
                    "weather1",
                    "weather2"
                ]
            }
        });
    });
});
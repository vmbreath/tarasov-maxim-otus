import React, {FC, useEffect, useState} from "react";
import './App.scss';
import ChosenTown from "./chosenTown";
import DayForecast from "./dayForecast";
import {useSelector, useDispatch} from "react-redux";
import {selectTowns, pushNewName, selectTown, setNewName} from "./currentTowns";
import {fetchWeather, getWeather, getFiveDaysForecast} from "./searchWeather";
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
} from "react-router-dom";


export const App: FC = () => {

    const [forecast, setForecast] = useState('');
    const town = useSelector(selectTown);
    const towns = useSelector(selectTowns);
    const weather = useSelector(getWeather);
    const fiveDaysForecast = useSelector(getFiveDaysForecast);
    const dispatch = useDispatch();

    useEffect(() => {
        getForecast();
    }, []);

    const getForecast = async () => {
        const result = await searchWeather();
        await dispatch(fetchWeather(String(town)));
        setForecast(result);
        console.log(result);
    }
    const searchWeather = async () => {
        console.log('townState', town);
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${town}&units=metric&lang=ru&appid=9d15fd722b6f2c64840bfdbc040e6975`
        const response = await fetch(url).then(response => response.json());
        setForecast(response);
        return await response;
    }

    const inputChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const searchInput = event.currentTarget.value;
        dispatch(setNewName(String(searchInput)));
        console.log(town)
    }

    return (
        <Router>
            <React.Fragment>
                <h1 className={'mainH1'}>Прогноз погоды</h1>
                <div className={'main-container'}>
                    <div className={'forecast-form'}>
                        <div data-tooltip='Добавить город в избранное?' className={'addTown'}
                             onClick={() => dispatch(pushNewName(String(town)))}>
                            <h2>Текущий город: {town}</h2>
                        </div>
                        <div className={'inputTown'}>
                            <p>Введите город: <input onChange={inputChange}/></p>
                            <div id="container">
                                <button onClick={getForecast} className="learn-more">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow"/>
                                    </span>
                                    <span className="button-text">Получить прогноз</span>
                                </button>
                            </div>
                        </div>
                        <div className={'links'}>
                            <Link className={'link'} to="/today">Прогноз на 1
                                день</Link>
                            <Link className={'link'} to="/five-days">Прогноз на 5
                                дней</Link>
                        </div>
                        <div>
                            <div>
                                <Route path="/today">
                                    {weather.list && weather.city ? (
                                        <DayForecast town={weather.city.name}
                                                     feelsLike={weather.list[0].main.feels_like}
                                                     temperature={weather.list[0].main.temp}
                                                     description={weather.list[0].weather[0].description}
                                                     icon={weather.list[0].weather[0].icon}
                                                     windSpeed={weather.list[0].wind.speed}
                                                     date={weather.list[0].dt_txt}
                                                     snow={weather.list[0].snow && weather.list[0].snow["3h"]}
                                                     rain={weather.list[0].rain && weather.list[0].rain["3h"]}
                                        />
                                    ) : 'NO DATA'}
                                </Route>
                            </div>
                            <Route path="/five-days">
                                <div className={'fiveDays'}>
                                    {weather.list && weather.city ? (
                                        fiveDaysForecast.map((list: any) =>
                                            <DayForecast town={weather.city.name}
                                                         feelsLike={list.main.feels_like}
                                                         temperature={list.main.temp}
                                                         description={list.weather[0].description}
                                                         icon={list.weather[0].icon}
                                                         windSpeed={list.wind.speed}
                                                         date={list.dt_txt}
                                                         snow={list.snow && list.snow["3h"]}
                                                         rain={list.rain && list.rain["3h"]}
                                                         key={list.dt_txt}
                                            />
                                        )
                                    ) : 'NO DATA'}
                                </div>
                            </Route>
                        </div>
                    </div>
                    <div className={'best-cities'}>
                        <div className={'container'}>
                            <h2>Избранные города</h2>
                            {towns.map((elem) =>
                                <ChosenTown defaultName={elem.toString()} key={elem}> </ChosenTown>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </Router>
    )

}

export default App;
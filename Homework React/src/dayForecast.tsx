import React, {FC, useState} from 'react';
import './chosenTown.scss';
import {css} from '@emotion/react'

export interface Props {
    town: string,
    icon: string,
    feelsLike: number,
    temperature: number,
    description: string,
    windSpeed: number,
    date: string,
    rain: number,
    snow: number
}

const container = css`
    margin-right: 1vw;
    display:"flex";
    flex-direction:"column";
    text-align:center;
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, #18F048 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, #F9E530 0%, rgba(255, 255, 255, 0) 100%);
    box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
`
const style = css`
font-family: Roboto;
font-style: normal;
font-weight: normal;
text-align: center;
color: #000000;
text-shadow: 0px 4px 4px rgba(107, 86, 237, 0.7);

`

export const DayForecast: FC<Props> = ({town = 'Москва', icon = "01n", feelsLike = 25, temperature = 666, description = "ясно", windSpeed = 666, date = '0.0.0', rain = 0, snow = 0}) => {
    return (
        <div css={container}>
            <h3 css={style}>Прогноз на {date}</h3>
            <p>Город: {town} </p>
            <p>Чувствуется как: {feelsLike} °C</p>
            <p>Температура: {temperature} °C</p>
            <p>Объем дождя за последние 3 часа: {rain} мм</p>
            <p>Объем снега за последние 3 часа: {snow} мм</p>
            <p>{description[0].toUpperCase() + description.slice(1)}</p>
            <img src={`http://openweathermap.org/img/w/${icon}.png`}/>
            <p>Скорость ветра: {windSpeed} м/с</p>
        </div>
    )
}

export default DayForecast;
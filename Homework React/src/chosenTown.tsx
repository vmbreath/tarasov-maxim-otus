import React, {FC, useState} from 'react';
import './chosenTown.scss';
import {useSelector, useDispatch} from "react-redux";
import {deleteName, setNewName} from "./currentTowns";

export interface Props {
    defaultName: string;
}

export const ChosenTown: FC<Props> = ({defaultName = 'Москва'}) => {
    const [name, setName] = useState(defaultName)
    const dispatch = useDispatch();
    const deleteFromTowns = (event: React.FormEvent<HTMLInputElement>) => {
        dispatch(deleteName(String(event.target.innerText)));
    }
    return (
        <div className={'listContainer'}>
            <div className={'deleteLi'} onClick={deleteFromTowns}/>
            <div className={'liElem'} onClick={() => dispatch(setNewName(String(name)))} data-tooltip='Выбрать?'>
                <h3>{name}</h3></div>
        </div>
    )
}

export default ChosenTown;
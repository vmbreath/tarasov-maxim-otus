import React from "react";
//Создаю интерфейс IElement для функции getPath+onClick
export default interface IElement {
    id: number | string
    tagName: string
    parentElement: IElement
    children: Array<IElement>
    previousElementSibling: IElement
    target: IElement
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
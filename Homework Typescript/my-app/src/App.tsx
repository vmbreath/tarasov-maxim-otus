import React from 'react';
import './App.scss';
import getPath from './getpath'

//Интерфейс для создания класса IHtmlElement
interface IHtmlElement {
    doElement(): object,
    element: object
}

//Класс htmlElements для возвращения нужного html элемента
class htmlElements implements IHtmlElement {
    constructor(element: object) {
        this.element = element;
    }

    element: object;

    doElement(): object {
        return this.element
    }
}

//Создаю типы элементов для html элементов
enum elementType {
    textarea,
    button,
    input,
}

//Создаю функцию, которая в зависимости от выбранного elementType возвращает необходимый html элемент
function getElementByType(type: elementType): IHtmlElement {
    const elementButton = <button key='button1'>BUTTON!</button>;
    const elementTextArea = <textarea name="description" value="TEXTAREA." key='textarea1'>TEXTAREA</textarea>;
    const elementInput = <p key='p1'>PARAGRAPH</p>;
    switch (type) {
        case elementType.button:
            return new htmlElements(elementButton);
        case elementType.textarea:
            return new htmlElements(elementTextArea);
        case elementType.input:
            return new htmlElements(elementInput);
    }
    throw new Error("Shouldn't be reachable");
}

//Создаю элементы
const elemButton: IHtmlElement = getElementByType(elementType.button);
const elemTextArea: IHtmlElement = getElementByType(elementType.textarea);
const elemInput: IHtmlElement = getElementByType(elementType.input);

//Класс App, который рендерит страничку, запускает функцию getPath и рендерит элемент html в зависимости от выбора
class App extends React.Component {
    state = {
        currentPath: 'undefined',
        htmlElement: elemTextArea.doElement()
    };

    handleClick = (event: any) => {
        this.setState({currentPath: getPath(event.target)});
    };
    handleClickButton = (event: { target: { checked: boolean } }): void => {
        if (event.target.checked) {
            this.setState({
                htmlElement: elemButton.doElement()
            });
        }
    };
    handleClickTextArea = (event: { target: { checked: boolean } }): void => {
        if (event.target.checked) {
            this.setState({
                htmlElement: elemTextArea.doElement()
            });
        }
    };
    handleClickInput = (event: { target: { checked: boolean } }): void => {
        if (event.target.checked) {
            this.setState({
                htmlElement: elemInput.doElement()
            });
        }
    };

    render() {
        return (
            <div onClick={this.handleClick} className="App">
                {this.state.htmlElement}
                <fieldset>
                    <legend>Выбери свой элемент</legend>
                    <p className={'pClass'}><input name='one' type="radio" onChange={this.handleClickButton}/>Сделай
                        кнопку</p>
                    <p className={'pClass'}><input name='one' type="radio" defaultChecked={true}
                                                   onChange={this.handleClickTextArea}/>Сделай текстовое
                        поле</p>
                    <p className={'pClass'}><input name='one' type="radio" onChange={this.handleClickInput}/>Сделай
                        параграф
                    </p>
                </fieldset>
                <div onClick={this.handleClick} className="first_div">
                    <div onClick={this.handleClick} id="test_div" className="radio_buttons">
                        <div onClick={this.handleClick} className="some_text">Some text
                            <article onClick={this.handleClick}>Article</article>
                        </div>
                        <input onClick={this.handleClick} type="radio" name="test" id="751"/>
                        <p onClick={this.handleClick} className="paragraph">Paragraph1</p>
                        <p onClick={this.handleClick}>Paragraph2</p>
                        <div onClick={this.handleClick}>
                            <p className="paragraph" onClick={this.handleClick}>Paragraph3</p>
                            <p onClick={this.handleClick}>Paragraph4</p>
                        </div>
                    </div>
                </div>
                <div className="form">
                    <div onClick={this.handleClick}>Путь к данному элементу:</div>
                    <a className={'outputPath'}>{this.state.currentPath}</a>
                </div>
            </div>
        );
    }
}

export default App;

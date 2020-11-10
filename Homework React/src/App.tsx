import React, {Component} from "react";
import './App.scss';
import Form from "./form";

export interface Props {
    name: string;
}

class App extends Component<Props> {
    render() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <div>
                <h1>Hello React!!!!!!!!!!</h1>
                <div className={'main-container'}>
                    {arr.map((elem) =>
                        <Form name={elem.toString()} key={elem}> </Form>
                    )}
                </div>
            </div>

        )
    }
}

export default App;
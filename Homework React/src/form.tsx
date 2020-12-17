import React, {Component} from "react";
import './form.scss';


export interface Props {
    name: string;
}

class Form extends Component<Props> {

    render() {
        return (
            <div className={'container'}>
                <h3 className={'h3'}>Hello React tsx! {this.props.name}</h3>
            </div>
        )
    }
}

export default Form;
import React from 'react';
import renderer from 'react-test-renderer';
import ChosenTown from './ChosenTown';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

test('ChosenTown renders exactly', () => {
    const initialState = {output: 10}
    const mockStore = configureStore();
    let store = mockStore(initialState);
    const component = renderer.create(
        <Provider store={store}><ChosenTown defaultName={'Москва'}/></Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
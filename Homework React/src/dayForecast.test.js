import React from 'react';
import renderer from 'react-test-renderer';
import DayForecast from './DayForecast';

test('DayForecast renders exactly', () => {
    const component = renderer.create(
        <DayForecast town={'Москва'}
                     feelsLike={666}
                     temperature={666}
                     description={'Ясно'}
                     icon={'01n'}
                     windSpeed={666}
                     date={'0.0.0'}
                     snow={666}
                     rain={666}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});
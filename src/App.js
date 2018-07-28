import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import {_common_, _leftNavbar_, _road_} from './stores';
import Body from './components/sections/body/Body';
import './assets/css/App.css';

const stores = {_common_, _leftNavbar_, _road_};

class App extends Component {
    render() {
        return (
            <Provider {...stores}>
                <Body />
            </Provider>
        );
    }
}

export default App;

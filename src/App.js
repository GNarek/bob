import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './reducers';
import Body from './components/sections/body/Body';
import './assets/css/App.css';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Body />
            </Provider>
        );
    }
}

export default App;

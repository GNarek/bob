import React, {Component} from 'react';
import {Provider} from 'mobx-react';

import {_common_, _leftNavbar_, _road_, _login_, _auth_, _register_, _history_, _rating_} from './stores';
import Body from './components/sections/body/Body';
import './assets/css/App.css';

const stores = {_common_, _leftNavbar_, _road_, _login_, _auth_, _register_, _history_, _rating_};

class App extends Component {
    componentDidMount() {
        _auth_.checkIsLoggedIn();
    }

    render() {
        return (
            <Provider {...stores}>
                <Body />
            </Provider>
        );
    }
}

export default App;

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './reducers';

import Menu from './components/sections/menu/Menu';
import Home from './components/Home';
import About from './components/About';
import Topics from './components/Topics';
import logo from './images/logo.png';
import './App.css';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">BOB</h1>
                        </header>

                        <Menu />

                        <div>
                            <Route exact={true} path="/" component={Home} />
                            <Route exact={true} path="/home" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/topics" component={Topics} />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

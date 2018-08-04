import React, {Component} from 'react';

import MenuButton from './MenuButton';
import Profile from '../../profile/Profile';

import logo from '../../../assets/images/logo.png';
import './header.css';

class Header extends Component {

    render() {

        return (
            <header id="header" className="App-header">
                <MenuButton />
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">BOB</h1>
                <Profile />
            </header>
        );
    }
}

export default Header;

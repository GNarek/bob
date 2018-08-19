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
                <div className="App-title-wrapper">
                    <h1 className="App-title">M<div className="logo-eye logo-eye-left" /><div className="logo-eye logo-eye-right" />lay</h1>
                    <div className="smile" />
                </div>
                <Profile />
            </header>
        );
    }
}

export default Header;

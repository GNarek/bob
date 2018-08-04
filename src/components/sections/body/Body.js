import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import Header from '../../../components/sections/header/Header';
import Menu from '../../../components/sections/menu/Menu';
import Content from '../../../components/sections/content/Content';


class Body extends Component {

    constructor(props) {
        super(props);

        this._handleCloseLeftNavbar = this._handleCloseLeftNavbar.bind(this);
    }

    _handleCloseLeftNavbar() {
        // Close navbar
        const {_leftNavbar_} = this.props;

        _leftNavbar_.close();
    }

    render() {
        const {_leftNavbar_, _common_} = this.props;

        return (
            <Router>
                <div className={`body ${_leftNavbar_.className()}`}>
                    <Menu language={_common_.language} />
                    <div onClick={this._handleCloseLeftNavbar} className="App">
                        <Header />
                        <Content />
                    </div>
                </div>
            </Router>
        );
    }
}

export default inject('_leftNavbar_', '_common_')(observer(Body));

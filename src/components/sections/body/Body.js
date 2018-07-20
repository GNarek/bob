import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {toggleLeftNavBar} from '../../../actions/leftNavBar';

import Header from '../../../components/sections/header/Header';
import Menu from '../../../components/sections/menu/Menu';
import Content from '../../../components/sections/content/Content';


class Body extends Component {

    constructor(props) {
        super(props);

        this._handleCloseLeftNavBar = this._handleCloseLeftNavBar.bind(this);
    }

    _handleCloseLeftNavBar() {
        // Close navbar if it's open
        if(this.props.leftNavbarState === 'OPEN') {
            this.props.toggleLeftNavBarHandler('close');
        }
    }

    render() {
        // Based on className navbar will be opened or closed
        const className = this.props.leftNavbarState === 'OPEN' ? 'left-navbar-open' : '';

        return (
            <Router>
                <div className={`body ${className}`}>
                    <Menu language={this.props.language} />
                    <div onClick={this._handleCloseLeftNavBar} className="App">
                        <Header />
                        <Content />
                    </div>
                </div>
            </Router>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    toggleLeftNavBarHandler: (arg) => dispatch(toggleLeftNavBar(arg)),
});

const mapStateToProps = (state) => ({
    leftNavbarState: state.leftNavBar,
    language: state.language,
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);

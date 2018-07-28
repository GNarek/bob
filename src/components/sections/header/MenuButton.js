import React, {Component} from 'react';
import {connect} from 'react-redux';

import {toggleLeftNavBar} from '../../../actions/leftNavBar';
import tr from '../../../translation';

import './menuButton.css';

class MenuButton extends Component {

    constructor(props) {
        super(props);

        this._handleToggleLeftNavBar = this._handleToggleLeftNavBar.bind(this);
    }

    _handleToggleLeftNavBar() {
        this.props.toggleLeftNavBarHandler();
    }

    render() {

        return (
            <div className="btn-menu" role="menu" onClick={this._handleToggleLeftNavBar}>
                <div>
                    <div className="ico-menu">
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                    </div>
                    <span>{tr.t('menu.menu')}</span>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
    toggleLeftNavBarHandler: (arg) => dispatch(toggleLeftNavBar(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);

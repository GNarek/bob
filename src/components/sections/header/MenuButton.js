import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import tr from '../../../translation';

import './menuButton.css';

class MenuButton extends Component {

    constructor(props) {
        super(props);

        this._handleOpenLeftNavbar = this._handleOpenLeftNavbar.bind(this);
    }

    _handleOpenLeftNavbar(e) {
        const {_leftNavbar_} = this.props;

        e.stopPropagation();
        _leftNavbar_.open();
    }

    render() {
        // Trick to force to re-render component
        const {_common_: {language}} = this.props; // eslint-disable-line

        return (
            <div className="btn-menu" role="menu" onClick={this._handleOpenLeftNavbar}>
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

export default inject('_leftNavbar_', '_common_')(observer(MenuButton));

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import './profile.css';

class ProfileMenu extends Component {

    constructor() {
        super();

        this._handleLogout = this._handleLogout.bind(this);
    }

    _handleLogout() {
        const {_auth_, onClose} = this.props;

        onClose();
        _auth_.logout();
    }

    render() {

        const {_auth_: {user}, state, onClose} = this.props;

        if(user === null || typeof user !== 'object' || typeof user.profile === 'undefined') {
            return null;
        }

        return (
            <div id="profileMenuWrapper" className={`profile-menu-wrapper-${state}`}>
                <div id="profileMenuFullBackground" onClick={onClose} />
                <div id="profileMenu">
                    <div className="profile-menu-item">Settings</div>
                    <div className="profile-menu-item" onClick={this._handleLogout}>Log out</div>
                </div>
            </div>
        );
    }
}

export default inject('_auth_')(observer(ProfileMenu));

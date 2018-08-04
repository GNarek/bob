import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ProfileMenu from './ProfileMenu';

import './profile.css';
import defaultAvatar from '../../assets/images/profiles/user-avatar-default.png';

class Profile extends Component {

    constructor() {
        super();

        this.state = {
            profileMenuState: 'close',
        };

        this._handleMenuOpen = this._handleMenuOpen.bind(this);
        this._handleMenuClose = this._handleMenuClose.bind(this);
    }

    _handleMenuOpen() {
        const newState = {profileMenuState: 'open'};

        this.setState(newState);
    }

    _handleMenuClose() {
        const newState = {profileMenuState: 'close'};

        this.setState(newState);
    }

    render() {
        const {user} = this.props._auth_;
        const {profileMenuState} = this.state;

        if(user === null || typeof user !== 'object' || typeof user.profile === 'undefined') {
            return null;
        }

        const {profile} = user;

        return (
            <div id="profileWrapper">
                <div id="profileName">{profile.firstName} {profile.lastName}</div>
                <img
                    id="avatar"
                    src={defaultAvatar}
                    alt="avatar"
                    onClick={this._handleMenuOpen}
                />
                <ProfileMenu state={profileMenuState} onClose={this._handleMenuClose} />
            </div>
        );
    }
}

export default inject('_auth_')(observer(Profile));

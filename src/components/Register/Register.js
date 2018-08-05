import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from 'react-router-dom';

import tr from '../../translation';

class Register extends Component {

    constructor() {
        super();

        this._handleSubmit = this._handleSubmit.bind(this);
        this.setEmailRef = this.setEmailRef.bind(this);
        this.setPasswordRef = this.setPasswordRef.bind(this);
        this.setFirstNameRef = this.setFirstNameRef.bind(this);
        this.setLastNameRef = this.setLastNameRef.bind(this);
        this._handleLoginLinkClick = this._handleLoginLinkClick.bind(this);
    }

    componentWillReceiveProps(props) {
        const {_register_} = props;

        _register_.validateForm();
    }

    _handleSubmit(event) {
        event.preventDefault();

        const {_register_} = this.props;

        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const firstName = this.firstNameInput.value;
        const lastName = this.lastNameInput.value;

        _register_.setEmail(email);
        _register_.setPassword(password);
        _register_.setFirstName(firstName);
        _register_.setLastName(lastName);
        _register_.handleSubmit();

    }

    setEmailRef(input) {
        this.emailInput = input;
    }

    setPasswordRef(input) {
        this.passwordInput = input;
    }

    setFirstNameRef(input) {
        this.firstNameInput = input;
    }

    setLastNameRef(input) {
        this.lastNameInput = input;
    }

    _handleLoginLinkClick() {
        const {_common_} = this.props;

        // Set new url in store
        _common_.setUrl(`/${_common_.language}/login`);
    }

    render() {
        const {_register_, _common_} = this.props;

        if(_common_.jwtToken) {
            this.props.history.push('/');
        }

        return (
            <div>
                <h2>{tr.t('page.register')}</h2>
                <div className="formWrapper">
                    <form onSubmit={this._handleSubmit} >
                        <div>
                            <input
                                type="text"
                                placeholder={tr.t('label.firstName')}
                                name="firstName"
                                ref={this.setFirstNameRef}
                            />
                            <div>{_register_.firstNameError}</div>

                            <input
                                type="text"
                                placeholder={tr.t('label.lastName')}
                                name="lastName"
                                ref={this.setLastNameRef}
                            />
                            <div>{_register_.lastNameError}</div>

                            <input
                                type="text"
                                placeholder={tr.t('label.email')}
                                name="email"
                                ref={this.setEmailRef}
                            />
                            <div>{_register_.emailError}</div>

                            <input
                                type="password"
                                placeholder={tr.t('label.password')}
                                name="password"
                                ref={this.setPasswordRef}
                            />
                            <div>{_register_.passwordError}</div>
                            <div>{_register_.commonError}</div>

                            <button>{tr.t('label.register')}</button>
                        </div>
                    </form>
                </div>

                <div id="loginLinkWrapper">
                    <Link className="login-link" onClick={this._handleLoginLinkClick} to={`/${_common_.language}/login`}>{tr.t('page.login')}</Link>
                </div>
            </div>
        );
    }
}

export default inject('_register_', '_common_')(withRouter(observer(Register)));

import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import tr from '../../translation';

class Login extends Component {

    constructor() {
        super();

        this._handleSubmit = this._handleSubmit.bind(this);
        this.setEmailRef = this.setEmailRef.bind(this);
        this.setPasswordRef = this.setPasswordRef.bind(this);
    }

    componentWillReceiveProps(props) {
        const {_login_} = props;

        _login_.validateForm();
    }

    _handleSubmit(event) {
        event.preventDefault();

        const {_login_} = this.props;

        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        _login_.setEmail(email);
        _login_.setPassword(password);
        _login_.handleSubmit();

    }

    setEmailRef(input) {
        this.emailInput = input;
    }

    setPasswordRef(input) {
        this.passwordInput = input;
    }

    render() {
        const {_login_, _common_} = this.props;

        if(_common_.jwtToken) {
            this.props.history.push('/');
        }

        return (
            <div>
                <h2>{tr.t('page.login')}</h2>
                <div className="formWrapper">
                    <form onSubmit={this._handleSubmit} >
                        <div>
                            <input
                                type="text"
                                placeholder={tr.t('label.email')}
                                name="email"
                                ref={this.setEmailRef}
                            />
                            <div>{_login_.emailError}</div>

                            <input
                                type="password"
                                placeholder={tr.t('label.password')}
                                name="password"
                                ref={this.setPasswordRef}
                            />
                            <div>{_login_.passwordError}</div>
                            <div>{_login_.commonError}</div>

                            <button>{tr.t('label.login')}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default inject('_login_', '_common_')(withRouter(observer(Login)));

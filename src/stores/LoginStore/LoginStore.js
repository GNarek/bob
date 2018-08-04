import {types} from 'mobx-state-tree';

import {_common_, _auth_} from '../../stores';
import tr from '../../translation';

const LoginStore = types
    .model('Common', {
        email: types.string,
        password: types.string,
        emailError: types.string,
        passwordError: types.string,
        commonError: types.string,
    })
    .actions((self) => ({
        reset() {
            self.email = '';
            self.password = '';
            self.emailError = '';
            self.passwordError = '';
            self.commonError = '';
        },
        setUser(data) {
            _common_.setJwtToken(data.jwt);
            _common_.setUser(data.user);
        },
        handleSubmit() {
            self.validateForm();

            self.doLogin();
        },
        setCommonError(error) {
            self.commonError = error;
        },
        async doLogin() {

            const response = await _auth_.login(self.email, self.password);

            if(response.status === 'success') {
                self.reset();
            } else {
                self.setCommonError(response.error.errorMessage);
            }
        },
        setEmail(email) {
            self.email = email;
        },
        setPassword(password) {
            self.password = password;
        },
        validateForm() {
            self.validateEmail();
            self.validatePassword();
        },
        validateEmail() {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

            if(re.test(self.email)) {
                self.emailError = '';
            } else {
                self.emailError = tr.t('errors.email');
            }
        },
        validatePassword() {
            if(self.password.length > 3) {
                self.passwordError = '';
            } else {
                self.passwordError = tr.t('errors.password', {count: 3});
            }
        },
    }));

const _login_ = LoginStore.create({email: '', password: '', emailError: '', passwordError: '', commonError: ''});

export {_login_};

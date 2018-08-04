import {types} from 'mobx-state-tree';

import {_common_} from '../CommonStore';
import {requestService} from '../../RequestService';
import configs from '../../configs';

import tr from '../../translation';

const AuthStore = types
    .model('Common', {
        user: types.frozen(),
        jwtToken: types.string,
        isLoggedIn: types.maybeNull(types.boolean),
    })
    .actions((self) => ({
        loginSuccess(data) {
            self.setUser(data.user);
            self.setJwtToken(data.jwt);
            self.isLoggedIn = true;
        },
        loginFailed() {
            self.setUser();
            self.setJwtToken();
            self.isLoggedIn = false;
        },
        setUser(user = {}) {
            self.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setJwtToken(jwtToken = '') {
            self.jwtToken = jwtToken;
            localStorage.setItem('jwtToken', jwtToken);
        },
        async login(email, password) {
            const url = `${configs.apiUrl}/${_common_.language}/login`;
            const data = {
                user: {
                    email,
                    password,
                },
            };
            const options = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                method: 'POST',
                body: JSON.stringify(data),
            };

            const response = await requestService.getRequest(url, options);

            if(response && response.status) {

                if(response.status === 'success') {
                    self.loginSuccess(response.data);

                    return {
                        status: 'success',
                        error: null,
                        data: null,
                    };
                }

                self.loginFailed();

                return response;
            }

            self.loginFailed();

            return {
                status: 'error',
                error: {
                    errorCode: '',
                    errorMessage: tr.t('errors.oops'),
                },
                data: null,
            };

        },

        logout() {
            localStorage.clear();
            self.user = {};
            self.jwtToken = '';
            self.isLoggedIn = false;
        },

        checkIsLoggedIn() {
            const jwtToken = localStorage.getItem('jwtToken');
            const user = JSON.parse(localStorage.getItem('user'));

            if(jwtToken && user) {

                const isJwtValid = self.verifyJwtToken(jwtToken);

                if(isJwtValid) {
                    const data = {
                        jwt: jwtToken,
                        user,
                    };

                    self.loginSuccess(data);
                }

            } else {
                // Clear all data from storage
                localStorage.clear();
                self.loginFailed();
            }
        },
        verifyJwtToken(jwtToken) {
            // TODO: Here we should do request to validate the jwt
            return jwtToken.length > 0 ? true : false;
        },
    }));

const _auth_ = AuthStore.create({user: {}, jwtToken: '', isLoggedIn: null});

export {_auth_};

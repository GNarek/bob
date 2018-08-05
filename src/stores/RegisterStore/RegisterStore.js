import {types} from 'mobx-state-tree';

import {_common_, _auth_} from '../../stores';
import tr from '../../translation';

const RegisterStore = types
    .model('Common', {
        email: types.string,
        emailError: types.string,

        password: types.string,
        passwordError: types.string,

        firstName: types.string,
        firstNameError: types.string,

        lastName: types.string,
        lastNameError: types.string,

        commonError: types.string,
    })
    .actions((self) => ({
        reset() {
            self.email = '';
            self.emailError = '';

            self.password = '';
            self.passwordError = '';

            self.firstName = '';
            self.firstNameError = '';

            self.lastName = '';
            self.lastNameError = '';

            self.commonError = '';
        },
        setUser(data) {
            _common_.setJwtToken(data.jwt);
            _common_.setUser(data.user);
        },
        handleSubmit() {
            self.validateForm();

            self.doRegister();
        },
        setCommonError(error) {
            self.commonError = error;
        },
        async doRegister() {

            const response = await _auth_.register(self.firstName, self.lastName, self.email, self.password);

            if(response.status === 'success') {
                self.reset();
            } else {
                if(response.error.errorMessage) {
                    self.setCommonError(response.error.errorMessage);
                } else {
                    if(response.error.errors && response.error.errors.length > 0) {
                        response.error.errors.forEach((error) => {
                            const fieldName = Object.keys(error)[0];
                            const setFunctionName = `set${self.ucfirst(fieldName)}Error`;

                            self[setFunctionName](error[fieldName]);
                        });
                    }
                }
            }
        },
        setFirstNameError(firstNameError) {
            self.firstNameError = firstNameError;
        },
        setLastNameError(lastNameError) {
            self.lastNameError = lastNameError;
        },
        setFirstName(firstName) {
            self.firstName = firstName;
        },
        setLastName(lastName) {
            self.lastName = lastName;
        },
        setEmail(email) {
            self.email = email;
        },
        setEmailError(emailError) {
            self.emailError = emailError;
        },
        setPassword(password) {
            self.password = password;
        },
        setPasswordError(passwordError) {
            self.passwordError = passwordError;
        },
        validateForm() {
            self.validateFirstName();
            self.validateLastName();

            self.validateEmail();
            self.validatePassword();
        },
        validateFirstName() {
            if(self.firstName.length > 3) {
                self.firstNameError = '';
            } else {
                self.firstNameError = tr.t('errors.firstName', {count: 3});
            }
        },
        validateLastName() {
            if(self.lastName.length > 3) {
                self.lastNameError = '';
            } else {
                self.lastNameError = tr.t('errors.lastName', {count: 3});
            }
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
        ucfirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
    }));

const _register_ = RegisterStore.create({email: '', password: '', emailError: '', passwordError: '', firstName: '', firstNameError: '', lastName: '', lastNameError: '', commonError: ''});

export {_register_};

import React, {Component} from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import About from '../components/About';
import Topics from '../components/Topics';
import Mathematics from '../components/games/math/Mathematics';


class Routers extends Component {

    constructor() {
        super();

        // Define supported languages.
        this.supportedLanguages = [
            'en',
            'ru',
            'hy',
        ];
        // Set default language.
        // If browser's default language is in supported languages then take it as default language, else choose "en".
        this.defaultLanguage = this.supportedLanguages.includes(navigator.language) ? navigator.language : 'en';
    }

    componentWillMount() {
        this.setUrl(this.props);
        this.setLanguage(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setUrl(nextProps);
        this.setLanguage(nextProps);
    }

    setUrl(props) {
        const {_common_} = this.props;
        const url = props.location.pathname;

        _common_.setUrl(url);
    }

    setLanguage(props) {
        const {_common_} = this.props;
        const language = props.match.params.language || this.defaultLanguage;

        _common_.setLanguage(language);
    }

    render() {
        const {match, location, _auth_} = this.props;

        // If url don't include language, create new url with defaul language and redirect
        if(!match.params.language) {
            const urlWithLanguage = `/${this.defaultLanguage}${location.pathname}`;

            return <Redirect to={urlWithLanguage} />;
        }

        // If user is not logged-in and is not in login page: redirect to login page
        if(!_auth_.isLoggedIn && location.pathname !== `/${match.params.language}/login` && location.pathname !== `/${match.params.language}/register`) {

            return <Redirect to="/login" />;
        }

        // If user is logged-in and is in login or register page: redirect to home page
        if(_auth_.isLoggedIn && (location.pathname === `/${match.params.language}/login` || location.pathname === `/${match.params.language}/register`)) {
            return <Redirect to="/home" />;
        }

        return (
            <div>
                <Route path={`${match.url}/`} component={Home} exact={true} />
                <Route path={`${match.url}/login`} component={Login} />
                <Route path={`${match.url}/register`} component={Register} />
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/about`} component={About} />
                <Route path={`${match.url}/topics`} component={Topics} />
                <Route path={`${match.url}/math`} component={Mathematics} />
            </div>
        );
    }
}


export default inject('_leftNavbar_', '_common_', '_auth_')(withRouter(observer(Routers)));

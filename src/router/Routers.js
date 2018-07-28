import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {setLanguage} from '../actions/language';
import {setUrl} from '../actions/url';

import Login from '../components/Login';
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
        const url = props.location.pathname;

        this.props.setUrlHandler(url);
    }

    setLanguage(props) {
        const language = props.match.params.language || this.defaultLanguage;

        this.props.setLanguageHandler(language);
    }

    render() {
        // If url don't include language, create new url with defaul language and redirect
        if(!this.props.match.params.language) {
            const urlWithLanguage = `/${this.defaultLanguage}${this.props.location.pathname}`;

            return <Redirect to={urlWithLanguage} />;
        }

        const {match} = this.props;

        return (
            <div>
                <Route path={`${match.url}/login`} component={Login} />
                <Route path={`${match.url}/`} component={Home} exact={true} />
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/about`} component={About} />
                <Route path={`${match.url}/topics`} component={Topics} />
                <Route path={`${match.url}/math`} component={Mathematics} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLanguageHandler: (arg) => dispatch(setLanguage(arg)),
    setUrlHandler: (arg) => dispatch(setUrl(arg)),
});

export default connect(null, mapDispatchToProps)(Routers);

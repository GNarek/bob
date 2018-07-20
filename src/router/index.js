import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Routers from './Routers';


class Router extends Component {

    render() {

        // if url starts with (en/ or ru/ or hy/) take it as language
        const language = '/:language(en|ru|hy)?';

        return <Route path={`${language}`} component={Routers} />;
    }
}

export default Router;

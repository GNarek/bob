import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router-dom';

import Router from '../../../router';
import LoaderDots from '../../common/LoaderDots';


class Content extends Component {

    renderContent() {
        const {_auth_} = this.props;

        if(_auth_.isLoggedIn === null) {
            return <div id="Authenticating">Authenticating <LoaderDots /></div>;
        }

        return <Router />;
    }

    render() {

        return (
            <div className="content">
                {this.renderContent()}
            </div>
        );
    }
}

export default inject('_common_', '_auth_')(withRouter(observer(Content)));

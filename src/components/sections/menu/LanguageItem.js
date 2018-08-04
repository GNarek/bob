import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

class LanguageItem extends Component {

    constructor(props) {
        super(props);

        this._handleCloseLeftNavbar = this._handleCloseLeftNavbar.bind(this);
    }

    _handleCloseLeftNavbar() {
        const {_leftNavbar_, _common_} = this.props;

        // Close menu bar
        _leftNavbar_.close();

        // Set new url in store
        _common_.setUrl(this.props.history.location.pathname);

        // Set new language in store
        _common_.setLanguage(this.props.val);
    }

    isActive() {
        const {_common_} = this.props;

        return this.props.val === _common_.language;
    }

    render() {
        const {pathnames, title} = this.props;
        const props = this.isActive()
            ? {active: 'active'}
            : {};

        return (
            <li {...props}>
                <Link onClick={this._handleCloseLeftNavbar} url={this.props.url} to={pathnames[0]}>{title}</Link>
            </li>
        );
    }
}

export default inject('_leftNavbar_', '_common_')(withRouter(observer(LanguageItem)));

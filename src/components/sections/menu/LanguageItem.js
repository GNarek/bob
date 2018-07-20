import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {toggleLeftNavBar} from '../../../actions/leftNavBar';
import {setLanguage} from '../../../actions/language';

import {setUrl} from '../../../actions/url';

class LanguageItem extends Component {

    constructor(props) {
        super(props);

        this._handleToggleLeftNavBar = this._handleToggleLeftNavBar.bind(this);
    }

    _handleToggleLeftNavBar() {
        // Close menu bar
        this.props.toggleLeftNavBarHandler('close');

        // Set new url in store
        this.props.setUrlHandler(this.props.history.location.pathname);

        // Set new language in store
        this.props.setLanguageHandler(this.props.val);
    }

    isActive() {
        return this.props.val === this.props.language;
    }

    render() {
        const {pathnames, title} = this.props;
        const props = this.isActive()
            ? {active: 'active'}
            : {};

        return (
            <li {...props}>
                <Link onClick={this._handleToggleLeftNavBar} url={this.props.url} to={pathnames[0]}>{title}</Link>
            </li>
        );
    }
}


const mapStateToProps = (state) => ({
    url: state.url,
    language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
    toggleLeftNavBarHandler: (arg) => dispatch(toggleLeftNavBar(arg)),
    setUrlHandler: (arg) => dispatch(setUrl(arg)),
    setLanguageHandler: (arg) => dispatch(setLanguage(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LanguageItem));

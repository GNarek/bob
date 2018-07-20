import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {toggleLeftNavBar} from '../../../actions/leftNavBar';
import {setUrl} from '../../../actions/url';

class MenuItem extends Component {

    constructor(props) {
        super(props);

        this._handleLinkClick = this._handleLinkClick.bind(this);
    }

    _handleLinkClick() {
        // Close menu bar
        this.props.toggleLeftNavBarHandler('close');

        // Set new url in store
        this.props.setUrlHandler(this.props.pathnames[0]);
    }

    /**
      * @desc  Checks if active link
      * @param string pathname - the current url
      * @param string pathnames - the urls which are related to this link
      * @return bool - true or false
    */
    isActive(pathname, pathnames) {

        const active = pathnames.some((path) => {

            if(pathname.startsWith(path)) {

                const nextIndex = path.length;

                return !pathname[nextIndex] || pathname[nextIndex] === '/';
            }

            return false;
        });

        return active;
    }

    render() {
        const {location: {pathname}, pathnames, title} = this.props;
        const props = this.isActive(pathname, pathnames)
            ? {active: 'active'}
            : {};

        return (
            <li {...props}>
                <Link onClick={this._handleLinkClick} to={pathnames[0]}>{title}</Link>
            </li>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    toggleLeftNavBarHandler: (arg) => dispatch(toggleLeftNavBar(arg)),
    setUrlHandler: (arg) => dispatch(setUrl(arg)),
});

export default connect(null, mapDispatchToProps)(withRouter(MenuItem));

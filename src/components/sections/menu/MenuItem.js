import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

class MenuItem extends Component {

    constructor(props) {
        super(props);

        this._handleLinkClick = this._handleLinkClick.bind(this);
    }

    _handleLinkClick() {
        const {_leftNavbar_, _common_} = this.props;

        // Close menu bar
        _leftNavbar_.close();

        // Set new url in store
        _common_.setUrl(this.props.pathnames[0]);
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

export default inject('_leftNavbar_', '_common_')(withRouter(observer(MenuItem)));

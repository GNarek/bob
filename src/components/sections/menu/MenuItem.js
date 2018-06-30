import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class MenuItem extends Component {

    isActive(pathname, pathnames) {

        const active = pathnames.some((path) => {
            if(path === '/') {
                return path === pathname;
            }


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
                <Link to={pathnames[0]}>{title}</Link>
            </li>
        );
    }
}

export default withRouter(MenuItem);

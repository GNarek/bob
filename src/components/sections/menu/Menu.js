import React, {Component} from 'react';

import MenuItem from './MenuItem';

class Menu extends Component {

    render() {

        return (
            <div>
                <ul id="Menu" className="menu">
                    <MenuItem title="Home" pathnames={['/', '/home']} />
                    <MenuItem title="About" pathnames={['/about']} />
                    <MenuItem title="Topics" pathnames={['/topics']} />
                </ul>
            </div>
        );
    }
}

export default Menu;

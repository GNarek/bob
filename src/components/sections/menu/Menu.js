import React, {Component} from 'react';

import MenuItem from './MenuItem';
import Languages from './Languages';

class Menu extends Component {

    render() {
        const {language} = this.props;

        return (
            <div id="LeftNavBar">
                <Languages />
                <ul id="Menu" className="menu">
                    <MenuItem title="Home" pathnames={[`/${language}/`, `${language}/home`]} />
                    <MenuItem title="About" pathnames={[`/${language}/about`]} />
                    <MenuItem title="Topics" pathnames={[`/${language}/topics`]} />
                    <MenuItem title="Math" pathnames={[`/${language}/math`]} />
                </ul>
            </div>
        );
    }
}

export default Menu;

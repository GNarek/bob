import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import MenuItem from './MenuItem';
import Languages from './Languages';
import tr from '../../../translation';

class Menu extends Component {

    render() {
        const {_common_: {language}} = this.props;

        return (
            <div id="LeftNavBar">
                <Languages />
                <ul id="Menu" className="menu">
                    <MenuItem title={tr.t('menu.home')} pathnames={[`/${language}/`, `${language}/home`]} />
                    <MenuItem title={tr.t('menu.about')} pathnames={[`/${language}/about`]} />
                    <MenuItem title={tr.t('menu.topics')} pathnames={[`/${language}/topics`]} />
                    <MenuItem title={tr.t('menu.math')} pathnames={[`/${language}/math`]} />
                </ul>
            </div>
        );
    }
}

export default inject('_common_')(observer(Menu));

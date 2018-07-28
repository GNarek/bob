import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import MenuItem from '../../sections/menu/MenuItem';
import Road from './games/Road';
import MathLogic from './games/MathLogic';
import Cipher from './games/Cipher';
import tr from '../../../translation';

class Mathematics extends Component {

    selectAGame() {
        return <h3>{tr.t('page.math.empty')}</h3>;
    }

    render() {

        const {match} = this.props;

        return(
            <div className="games mathematics">

                <ul className="menu">
                    <MenuItem title={tr.t('page.math.menu.road')} pathnames={[`${match.url}/road`]} />
                    <MenuItem title={tr.t('page.math.menu.logic')} pathnames={[`${match.url}/mathlogic`]} />
                    <MenuItem title={tr.t('page.math.menu.cipher')} pathnames={[`${match.url}/cipher`]} />
                </ul>

                <Route path={`${match.url}/road`} component={Road} />
                <Route path={`${match.url}/mathlogic`} component={MathLogic} />
                <Route path={`${match.url}/cipher`} component={Cipher} />

                <Route
                    exact={true}
                    path={match.url}
                    render={this.selectAGame}
                />
            </div>
        );
    }
}

export default Mathematics;

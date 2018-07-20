import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import MenuItem from '../../sections/menu/MenuItem';
import Road from './games/Road';
import MathLogic from './games/MathLogic';
import Cipher from './games/Cipher';

const emptyState = () => <h3>Please select a game.</h3>;

class Mathematics extends Component {

    render() {

        const {match} = this.props;

        return(
            <div className="games mathematics">

                <ul className="menu">
                    <MenuItem title="Road" pathnames={[`${match.url}/road`]} />
                    <MenuItem title="Logic" pathnames={[`${match.url}/mathlogic`]} />
                    <MenuItem title="Cipher" pathnames={[`${match.url}/cipher`]} />
                </ul>

                <Route path={`${match.url}/road`} component={Road} />
                <Route path={`${match.url}/mathlogic`} component={MathLogic} />
                <Route path={`${match.url}/cipher`} component={Cipher} />

                <Route
                    exact={true}
                    path={match.url}
                    render={emptyState}
                />
            </div>
        );
    }
}

export default Mathematics;

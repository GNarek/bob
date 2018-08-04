import React from 'react';
import {Route} from 'react-router-dom';

import MenuItem from './sections/menu/MenuItem';
import Topic from './Topic';

const emptyState = () => <h3>Please select a topic.</h3>;

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>

        <ul className="menu">

            <MenuItem title="Rendering with React" pathnames={[`${match.url}/rendering`]} />
            <MenuItem title="Components" pathnames={[`${match.url}/components`]} />
            <MenuItem title="Props v. State" pathnames={[`${match.url}/props-v-state`]} />

        </ul>
        <Route path={`${match.url}/:topicId?/:userId?`} component={Topic} />
        <Route
            exact={true}
            path={match.url}
            render={emptyState}
        />
    </div>
);


export default Topics;

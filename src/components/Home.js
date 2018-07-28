import React from 'react';

import tr from '../translation';

const Home = () => (
    <div>
        <h2>{tr.t('menu.home')}</h2>
        <div>{tr.t('page.home')}</div>
    </div>
);

export default Home;

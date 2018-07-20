import {combineReducers} from 'redux';

import changeCountReducer from './count';
import leftNavBarReducer from './leftNavBar';
import languageReducer from './language';
import urlReducer from './url';

export default combineReducers({
    count: changeCountReducer,
    leftNavBar: leftNavBarReducer,
    language: languageReducer,
    url: urlReducer,
});

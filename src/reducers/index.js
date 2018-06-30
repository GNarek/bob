import {combineReducers} from 'redux';

import changeCountReducer from './count';

export default combineReducers({
    count: changeCountReducer,
});

import tr from '../../translation';

const setLanguage = (state = 'en', action) => {

    switch (action.type) {
        case 'SET_LANGUAGE':
            tr.setLanguage(action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default setLanguage;

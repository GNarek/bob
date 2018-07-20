const setLanguage = (state = 'en', action) => {

    switch (action.type) {
        case 'SET_LANGUAGE':
            return action.payload;
        default:
            return state;
    }
};

export default setLanguage;

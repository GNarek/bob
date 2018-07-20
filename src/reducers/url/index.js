const setUrl = (state = '/', action) => {

    switch (action.type) {
        case 'SET_URL':
            return action.payload;
        default:
            return state;
    }
};

export default setUrl;

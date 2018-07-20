export const setLanguage = (arg) => { // eslint-disable-line

    // Just return language
    return {
        type: 'SET_LANGUAGE',
        payload: arg,
    };
};

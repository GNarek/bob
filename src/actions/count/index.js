export const changeCountAction = (arg) => {
    switch (arg) {
        case 'increase':
            return {
                type: 'INCREASE_COUNT',
                payload: arg,
            };

        case 'decrease':
            return {
                type: 'DECREASE_COUNT',
                payload: arg,
            };

        default:
            return {
                type: '',
            };
    }
};

export const decreaseCountAction = () => ({
    type: 'DECREASE_COUNT'
});

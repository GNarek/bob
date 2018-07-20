export const toggleLeftNavBar = (arg) => {
    switch (arg) {
        case 'open':
            return {
                type: 'OPEN',
                payload: arg,
            };

        case 'close':
            return {
                type: 'CLOSE',
                payload: arg,
            };

        default:
            return {
                type: 'TOGGLE',
                payload: arg,
            };
    }
};

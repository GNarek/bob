const toggle = (state = 'CLOSE', action) => {

    switch (action.type) {
        case 'TOGGLE':
            return {'OPEN': 'CLOSE', 'CLOSE': 'OPEN'}[state];

        case 'OPEN':
            return 'OPEN';

        case 'CLOSE':
            return 'CLOSE';

        default:
            return state;
    }
};

export default toggle;

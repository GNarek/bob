const changeCount = (state = 0, action) => {

    switch (action.type) {
        case 'INCREASE_COUNT':

            if(state % 2 === 0) {
                document.body.classList.add('navbar-open');
            } else {
                document.body.classList.remove('navbar-open');
            }
            return state + 1;

        case 'DECREASE_COUNT':
            return state - 1;

        default:
            return state;
    }
};

export default changeCount;

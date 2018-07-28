import {types} from 'mobx-state-tree';

const LeftNavbarStore = types
    .model('LeftNavbar', {
        state: types.string,
    })
    .actions((self) => ({
        close() {
            self.state = 'CLOSE';
        },
        open() {
            self.state = 'OPEN';
        },
        toggle() {
            self.state = {OPEN: 'CLOSE', CLOSE: 'OPEN'}[self.state];
        },
    }))
    .views((self) => ({
        className() {
            return self.state === 'OPEN' ? 'left-navbar-open' : 'left-navbar-close';
        }
    }));

const _leftNavbar_ = LeftNavbarStore.create({state: 'CLOSE'});

export {_leftNavbar_};

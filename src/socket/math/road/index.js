import socket from '../../../socket';
import {_auth_} from '../../../stores/';

class RoadSocket {

    constructor() {
        // Define main event name.
        this.mainEventName = 'games/math/problem/road';
    }

    // Add event listeners
    start(params, listeners) {
        const {onGame, onTime, onSuccess, onError, onExpired} = listeners;

        // emit main event
        this.emit('', params);

        socket.on(`${this.mainEventName}:game`, onGame);
        socket.on(`${this.mainEventName}:timer`, onTime);
        socket.on(`${this.mainEventName}:success`, onSuccess);
        socket.on(`${this.mainEventName}:error`, onError);
        socket.on(`${this.mainEventName}:expired`, onExpired);
        socket.on(`${this.mainEventName}:unauthorized`, this.logout);
    }


    // Remove event listeners
    close(listeners) {
        const {onGame, onTime, onSuccess, onError, onExpired} = listeners;

        socket.emit(`${this.mainEventName}:exit`);
        socket.removeListener(`${this.mainEventName}:game`, onGame);
        socket.removeListener(`${this.mainEventName}:timer`, onTime);
        socket.removeListener(`${this.mainEventName}:success`, onSuccess);
        socket.removeListener(`${this.mainEventName}:error`, onError);
        socket.removeListener(`${this.mainEventName}:expired`, onExpired);
    }

    emit(eventName, params) {
        const data = {
            headers: {
                jwt: _auth_.jwtToken,
            },
            data: params,
        };

        socket.emit(`${this.mainEventName}${eventName}`, data);
    }

    logout() {
        alert('Session expired. Please log in again or register new accout.'); // eslint-disable-line
        _auth_.logout();
    }

}

export default new RoadSocket();

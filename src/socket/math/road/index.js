import socket from '../../../socket';

class RoadSocket {

    constructor() {
        // Define main event name.
        this.mainEventName = 'games/math/problem/road';
    }

    // Add event listeners
    start(params, listeners) {
        const {onGame, onTime, onSuccess, onError, onExpired} = listeners;

        socket.emit(this.mainEventName, params);
        socket.on(`${this.mainEventName}:game`, onGame);
        socket.on(`${this.mainEventName}:timer`, onTime);
        socket.on(`${this.mainEventName}:success`, onSuccess);
        socket.on(`${this.mainEventName}:error`, onError);
        socket.on(`${this.mainEventName}:expired`, onExpired);
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
        socket.emit(`${this.mainEventName}${eventName}`, params);
    }

}

export default new RoadSocket();

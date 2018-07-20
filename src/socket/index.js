import openSocket from 'socket.io-client';

// TODO: get port from configs
const port = 5011;
const socket = openSocket(`localhost:${port}`);

export default socket;

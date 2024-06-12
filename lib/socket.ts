import { io } from 'socket.io-client';

// export const socket = io(String(process.env.SOCKET_DOMAIN));

export const socket = io('http://localhost:4000');

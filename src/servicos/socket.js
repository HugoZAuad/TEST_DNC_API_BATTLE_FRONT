import { io } from 'socket.io-client';

const socket = io('https://test-dnc-api-battle-back.onrender.com');

export default socket;

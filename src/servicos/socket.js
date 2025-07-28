import { io } from 'socket.io-client';

export function createSocket(namespace = '') {
  const url = 'https://test-dnc-api-battle-back.onrender.com';
  if (namespace) {
    return io(url + '/' + namespace);
  }
  return io(url);
}

import { Socket } from 'socket.io';

export const createMessage = async (payload: string, socket: Socket) => {
  socket.broadcast.emit('message:emit', payload);
};

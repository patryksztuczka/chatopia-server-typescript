import { Server } from 'socket.io';

import { createMessage } from './handlers/messages';

const io = new Server({
  cors: {
    origin: 'http://localhost:5173'
  }
});

const PORT = 3000;

io.listen(PORT);

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('message:create', (payload) => createMessage(payload, socket));
});

import { createServer } from 'node:http';

import cors from 'cors';
import { Server } from 'socket.io';
import express, { Request, Response } from 'express';
import 'dotenv/config';

import { socketServer } from './middleware/socket';
import routes from './routes';

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next) =>
  socketServer(req, res, next, io)
);
app.use(routes);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// io.listen(PORT);

// io.on('connection', (socket) => {
//   console.log('connected');
//   socket.on('message:create', (payload) => createMessage(payload, socket));
//   socket.on('disconnect', () => console.log('disconnected'));
// });

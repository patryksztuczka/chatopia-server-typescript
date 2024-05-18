import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

export const socketServer = async (
  req: Request,
  res: Response,
  next: NextFunction,
  io: Server
) => {
  req.io = io;
  next();
};

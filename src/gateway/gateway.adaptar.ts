/* eslint-disable @typescript-eslint/ban-ts-comment */

import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RequestHandler } from 'express';
import { ServerOptions, Socket } from 'socket.io';
export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly session: RequestHandler;
  constructor(session: RequestHandler, app: INestApplicationContext) {
    super(app);
    this.session = session;
  }
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    const wrap = (middleware: RequestHandler) => (socket: Socket, next: any) =>
      //@ts-expect-error
      middleware(socket.request, {}, next);
    server.use(wrap(this.session));
    server.use((socket, next) => {
      try {
        const user = socket.request.session.passport.user;
        console.log(user);
        return next();
      } catch (e) {
        return next(e);
      }
    });
    return server;
  }
}

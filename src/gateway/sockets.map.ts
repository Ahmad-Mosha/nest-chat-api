import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
@Injectable()
export class SocketsMap {
  private readonly sockets = new Map<string, Socket>();

  getUserSocket(id: string) {
    return this.sockets.get(id);
  }

  setUserSocket(userId: string, socket: Socket) {
    this.sockets.set(userId, socket);
  }
  removeUserSocket(userId: string) {
    this.sockets.delete(userId);
  }

  getSockets(): Map<string, Socket> {
    return this.sockets;
  }
}

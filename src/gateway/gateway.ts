import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketsMap } from './sockets.map';
@WebSocketGateway({
  cors: {
    origin: ['*'],
    credentials: true,
  },
})
export class Gateway {
  constructor(private readonly socketMap: SocketsMap) {}
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client) {
    this.socketMap.setUserSocket(
      client.request.session.passport.user._id,
      client,
    );
  }

  handleDisconnect(@ConnectedSocket() client) {
    this.socketMap.removeUserSocket(client.request.session.passport.user._id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client) {
    const {
      session: {
        passport: {
          user: { _id },
        },
      },
    } = client.request;
    const author = this.socketMap.getUserSocket(_id);
    const map = this.socketMap.getSockets();
    console.log(map);
    console.log(author);
  }
}

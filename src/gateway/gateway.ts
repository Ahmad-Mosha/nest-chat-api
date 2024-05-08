import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketsMap } from './sockets.map';
import { OnEvent } from '@nestjs/event-emitter';
import { GatewayMessageData } from 'src/utils/types';
@WebSocketGateway({
  cors: {
    origin: [`http://localhost:3001`],
    credentials: true,
  },
})
export class Gateway {
  constructor(private readonly socketMap: SocketsMap) {}
  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client) {
    console.log('connected!');
    this.socketMap.setUserSocket(
      client.request.session.passport.user._id,
      client,
    );
  }

  handleDisconnect(@ConnectedSocket() client) {
    console.log('disconnected');
    this.socketMap.removeUserSocket(client.request.session.passport.user._id);
  }

  @OnEvent('onMessageCreate')
  handleMessage(body: GatewayMessageData) {
    const recipent =
      body.message.author._id.toString() ===
      body.conversation.creator._id.toString()
        ? body.conversation.recipent
        : body.conversation.creator;
    const id = recipent._id.toString();
    const recipentSocket = this.socketMap.getUserSocket(id);
    console.log(recipentSocket);
    recipentSocket.emit('onMessage', body.message.content);
  }
}

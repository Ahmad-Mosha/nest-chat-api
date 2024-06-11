import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketsMap } from './sockets.map';
import { MessageData } from 'src/utils/types';
import { OnEvent } from '@nestjs/event-emitter';
@WebSocketGateway({
  cors: {
    origin: [`http://localhost:3001`],
    credentials: true,
  },
})
export class Gateway {
  constructor(private readonly socketMap: SocketsMap) {}

  @WebSocketServer()
  public server: Server;

  // afterInit(server: Server) {
  //   this.messageService.events$.asObservable().subscribe({
  //     next: (event) => {
  //       server.emit('message:create', event.data);
  //     },
  //   });
  // }

  handleConnection(@ConnectedSocket() client) {
    this.socketMap.setUserSocket(
      client.request.session.passport.user._id,
      client,
    );
  }

  handleDisconnect(@ConnectedSocket() client) {
    this.socketMap.removeUserSocket(client.request.session.passport.user._id);
  }

  @OnEvent('event:messageCreate')
  handleMessageCreate(body: MessageData) {
    console.log('Handling', body);
    const {
      message: { author },
      conversation: { creator, recipent },
    } = body;

    const recipentSocket =
      author._id.toString() === creator._id.toString()
        ? this.socketMap.getUserSocket(recipent._id.toString())
        : this.socketMap.getUserSocket(creator._id.toString());

    const authorSocket = this.socketMap.getUserSocket(author._id.toString());

    if (authorSocket) authorSocket.emit('onMessage', body.message);
    if (recipentSocket) recipentSocket.emit('onMessage', body.message);
  }
}

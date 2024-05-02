import { Module } from '@nestjs/common';
import { SocketsMap } from './sockets.map';
import { Gateway } from './gateway';

@Module({
  providers: [SocketsMap, Gateway],
})
export class GatewayModule {}

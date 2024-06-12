import { Global, Module } from '@nestjs/common';
import { SocketsMap } from './sockets.map';
import { Gateway } from './gateway';

@Global()
@Module({
  providers: [SocketsMap, Gateway],
  exports: [Gateway],
})
export class GatewayModule {}

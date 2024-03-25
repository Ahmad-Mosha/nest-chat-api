import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { AuthUser } from 'src/decorators/auth.decorator';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ChatInviationService } from './chat-invitations.service';
import { CreateChatInvitationDto } from './dto/create-chatinvitation.dto';
import { Account, User } from '../typeorm/index';

@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticatedGuard)
@Controller('requests')
export class ChatInvitationController {
  constructor(private readonly chatInvitationService: ChatInviationService) {}

  @Get('fetch')
  async getRequest(@AuthUser() user: User | Account) {
    return await this.chatInvitationService.getChatInvitationByUser(user);
  }

  @Post('create')
  async createRequest(
    @AuthUser() sender: User | Account,
    @Body() request: CreateChatInvitationDto,
  ) {
    return await this.chatInvitationService.createRequest({
      ...request,
      sender,
    });
  }
}

import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthUser } from 'src/decorators/auth.decorator';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { ChatInviationService } from './chat-invitations.service';
import { CreateChatInvitationDto } from './dto/create-chatinvitation.dto';
import { Account, User } from '../typeorm/index';
import { ValidateMongoIdPipe } from 'src/pipes/validate-mongoid.pipe';

@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticatedGuard)
@Controller('invitations')
export class ChatInvitationController {
  constructor(private readonly chatInvitationService: ChatInviationService) {}

  @Get()
  async getRequest(@AuthUser() user: User | Account) {
    return await this.chatInvitationService.getChatInvitationByUser(user);
  }

  @Post('create')
  async createInvitation(
    @AuthUser() sender: User | Account,
    @Body() request: CreateChatInvitationDto,
  ) {
    return await this.chatInvitationService.createRequest({
      ...request,
      sender,
    });
  }

  @Delete('delete/:id')
  async deleteInvitation(
    @AuthUser() user: User | Account,
    @Param('id', ValidateMongoIdPipe) id: string,
  ) {
    await this.chatInvitationService.deleteChatInvitation(user, id);
    return 'Invitation has been deleted successfully';
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Account } from 'src/typeorm/entities/account.entity';
import { ConversationsService } from './conversations.service';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { GetConversationDTO } from './dto/get-conversation.dto';

@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticatedGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  @Get('find')
  async getConversations() {
    return await this.conversationService.getAllConversations();
  }

  @Post('/create')
  async createConv(
    @Req() req,
    @Body() ConversationData: CreateConversationDto,
  ) {
    const author: User | Account = req.user;
    const conversation = await this.conversationService.createConversation({
      ...ConversationData,
      author,
    });
    return conversation;
  }

  @Post()
  async getConv(@Body() conversationId: GetConversationDTO) {
    return await this.conversationService.getConversation(conversationId.id);
  }
  // why using Post here? It should be Get instead , and the body should be a param
}

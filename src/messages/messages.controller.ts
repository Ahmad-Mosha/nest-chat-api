import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/auth.guard';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Account } from 'src/typeorm/entities/account.entity';
import { User } from 'src/typeorm/entities/user.entity';

@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthenticatedGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}
  @Post('create')
  async createMessage(@Req() req, @Body() messageBody: CreateMessageDto) {
    const author: Account | User = req.user;
    return this.messageService.createMessage({ ...messageBody, author });
  }
}

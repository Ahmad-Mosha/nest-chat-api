import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/message.entity';
import { Repository } from 'typeorm';
import { Conversation } from 'src/typeorm/entities/conversation.entity';
import { MessageData } from 'src/utils/types';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message, 'MongoDB')
    private readonly messagesRepo: Repository<Message>,
    @InjectRepository(Message, 'MongoDB')
    private readonly conversationRepo: Repository<Conversation>,
  ) {}

  async getAllMessages() {
    return await this.messagesRepo.find();
  }

  async createMessage(msg: MessageData) {
    const conversation = await this.conversationRepo.findOne({
      where: { _id: msg.conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('This conversation does not exist.');
    }
    const newMessage = this.messagesRepo.create(msg);
    await this.messagesRepo.save(newMessage);
    return 'Created a new Message succ';
  }
}

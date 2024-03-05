import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Conversation } from 'src/typeorm/entities/conversation.entity';
import { Message } from 'src/typeorm/entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { ConversationRequestData } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation, 'MongoDB')
    private readonly conversationRepo: Repository<Conversation>,
    private readonly userService: UsersService,
  ) {}

  async getAllConversations() {
    return await this.conversationRepo.find();
  }
  async createConversation(data: ConversationRequestData) {
    const recipient = await this.userService.getUserByEmail(data.recipient);
    const conversation = this.conversationRepo.create({
      participants: [data.author, recipient],
    });
    return await this.conversationRepo.save(conversation);
  }

  async getConversation(id: ObjectId) {
    const conversation = await this.conversationRepo.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!conversation) {
      throw new NotFoundException('This conversation does not exist.');
    }
    return conversation;
  }

  async updatingConversationMessages(
    conversation: Conversation,
    message: Message,
  ) {
    await this.conversationRepo.update(conversation._id, {
      messages: [message],
    });
    return;
  }
}

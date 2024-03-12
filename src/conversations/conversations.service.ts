import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Conversation } from 'src/typeorm/entities/conversation.entity';
import { Message } from 'src/typeorm/entities/message.entity';
import { UsersService } from 'src/users/users.service';
import { ConversationRequestData } from 'src/utils/types';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation, 'MongoDB')
    private readonly conversationRepo: MongoRepository<Conversation>,
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
    if (!conversation.messages) {
      return await this.conversationRepo.updateOne(
        { _id: conversation._id },
        { $set: { messages: [message] } },
      );
    }

    return await this.conversationRepo.updateOne(
      { _id: conversation._id },
      { $push: { messages: message } as any },
    );
  }
}

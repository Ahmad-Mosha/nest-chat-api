import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/typeorm/entities/message.entity';
import { Repository } from 'typeorm';
import { MessageRequestData } from 'src/utils/types';
import { ConversationsService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message, 'MongoDB')
    private readonly messagesRepo: Repository<Message>,
    private readonly conversationService: ConversationsService,
  ) {}

  // public events$ = new Subject<{ data: MessageData }>();

  async getMessages() {
    return await this.messagesRepo.find();
  }

  async createMessage(msg: MessageRequestData) {
    const conversation = await this.conversationService.getConversationById(
      msg.conversationId,
    );

    if (
      msg.author._id.toString() !== conversation.creator._id.toString() &&
      msg.author._id.toString() !== conversation.recipient._id.toString()
    ) {
      throw new UnauthorizedException(
        'Only the creator or recipient can send messages',
      );
    }

    const newMessage = this.messagesRepo.create(msg);
    await this.messagesRepo.save(newMessage);
    await this.conversationService.updateConversationMessages(
      conversation,
      newMessage,
    );
    const messageData = {
      conversation: {
        creator: conversation.creator,
        recipient: conversation.recipient,
      },
      message: newMessage,
    };
    // this.events$.next({ data: messageData });
    return messageData;
  }
}

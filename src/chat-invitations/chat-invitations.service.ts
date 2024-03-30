import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { InvitationData } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import { isPending } from 'src/utils/chat-invitations/isPending';
import { Account, User, ChatInvitation } from 'src/typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class ChatInviationService {
  constructor(
    @InjectRepository(ChatInvitation, 'MongoDB')
    private readonly chatInvitationRepo: MongoRepository<ChatInvitation>,
    private readonly usersService: UsersService,
  ) {}

  async createRequest(invitaionData: InvitationData) {
    const receiver = await this.usersService.getUserByEmail(
      invitaionData.receiver,
    );
    if (receiver.email === invitaionData.sender.email) {
      throw new BadRequestException("You can't send a request to  yourself");
    }

    await isPending(invitaionData.sender, receiver, this.chatInvitationRepo);

    const requestedInvitation = this.chatInvitationRepo.create({
      ...invitaionData,
      receiver,
    });
    return await this.chatInvitationRepo.save(requestedInvitation);
  }

  async getChatInvitationByUser(authUser: User | Account) {
    const invitations = await this.chatInvitationRepo.find({
      where: {
        receiver: authUser,
      },
    });
    if (!invitations) {
      throw new BadRequestException(
        'No chat invitations were found for that user',
      );
    }

    return invitations;
  }

  async getChatInvitationByid(id: string) {
    const invitation = await this.chatInvitationRepo.findOne({
      where: {
        _id: new ObjectId(id),
      },
    });

    if (!invitation) {
      throw new BadRequestException('No invitation was found with that id');
    }

    return invitation;
  }

  async deleteChatInvitation(user: User | Account, id: string) {
    const invitation = await this.getChatInvitationByid(id);
    if (
      invitation.receiver.email === user.email ||
      invitation.sender.email === user.email
    ) {
      return await this.chatInvitationRepo.findOneAndDelete({
        _id: new ObjectId(id),
      });
    }

    throw new BadRequestException(
      'You are not allowed to delete this invitation',
    );
  }
}

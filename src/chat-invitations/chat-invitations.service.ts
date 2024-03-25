import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { InvitationData } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import { isPending } from 'src/utils/chat-invitations/isPending';
import { Account, User, ChatInvitation } from 'src/typeorm';

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
        $or: [{ sender: authUser }, { receiver: authUser }],
      },
    });
    return invitations;
  }
}

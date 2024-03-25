import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatInvitationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  receiver: string;
}

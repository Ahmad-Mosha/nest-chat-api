import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The targeted user which the message will be sent to',
    type: String,
    required: true,
  })
  recipient: string;
}

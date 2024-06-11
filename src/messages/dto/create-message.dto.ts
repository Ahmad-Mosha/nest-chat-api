import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The content of the message',
    type: String,
    required: true,
  })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The targeted conversation',
    type: String,
    required: true,
  })
  conversationId: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  @ApiProperty({
    description: 'The targeted conversation',
    type: Number,
    required: true,
  })
  conversationId: number;
}

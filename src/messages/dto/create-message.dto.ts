import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

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
  @IsMongoId()
  @ApiProperty({
    description: 'The targeted conversation',
    type: String,
    required: true,
  })
  conversationId: ObjectId;
}

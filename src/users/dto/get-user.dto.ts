import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'typeorm';

export class GetUserDTO {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    description: 'The id of a conversation',
    type: String,
    required: true,
  })
  id: ObjectId;
}

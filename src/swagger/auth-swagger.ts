// auth-swagger.ts
import { ApiProperty } from '@nestjs/swagger';

export class BaseLoginResponse {
  @ApiProperty({ description: 'Unique user identifier' })
  id: string;

  @ApiProperty({ description: "User's display name or username" })
  displayName: string;

  @ApiProperty({
    description: "User's email address (if available)",
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: "URL to user's profile picture (if available)",
    required: false,
  })
  image?: string;

  @ApiProperty({ description: 'Login provider: "twitter" or "google"' })
  provider: string;

  @ApiProperty({ description: 'Access token for the user' })
  accessToken: string;
}

export class TwitterLoginResponse extends BaseLoginResponse {}

export class GoogleLoginResponse extends BaseLoginResponse {}

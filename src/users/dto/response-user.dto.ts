// response-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ResponseUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account',
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'The name of the user',
  })
  isAdmin: boolean;

  constructor(user: User) {
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
  }
}

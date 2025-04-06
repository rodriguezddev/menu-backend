import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: false,
    description: 'Whether the user is an admin',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean = false;
}

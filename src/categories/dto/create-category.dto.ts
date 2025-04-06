import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Aperitivos',
    description: 'The name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Platos pequeños para empezar',
    description: 'Description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}

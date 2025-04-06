// src/dish/dto/create-dish.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDishDto {
  @ApiProperty({
    example: 'Ceviche Clásico',
    description: 'The name of the dish',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Pescado fresco marinado en jugo de limon, cilantro, y papas',
    description: 'Description of the dish',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 18.99,
    description: 'Price of the dish',
  })
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  price: number;

  @ApiProperty({
    example: 'Aperitivos',
    description: 'Category of the dish',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}

// src/description/dto/update-description.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateDescriptionDto } from './create-description.dto';

export class UpdateDescriptionDto extends PartialType(CreateDescriptionDto) {}

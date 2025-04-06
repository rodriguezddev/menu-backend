// src/description/description.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Description } from './description.entity';
import { DescriptionController } from './description.controller';
import { DescriptionService } from './description.service';

@Module({
  imports: [TypeOrmModule.forFeature([Description])],
  controllers: [DescriptionController],
  providers: [DescriptionService],
})
export class DescriptionModule {}

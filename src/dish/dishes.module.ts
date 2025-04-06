// src/dish/dishes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dish]),
    MulterModule.register({
      dest: './uploads/dishes',
    }),
  ],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dish } from './dish.entity';
import { UpdateDishDto } from './dto/update-dish.dto';
import { IDish } from './interfaces/dish.interface';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async create(data: IDish): Promise<Dish> {
    const dish = this.dishRepository.create(data);
    return await this.dishRepository.save(dish);
  }

// src/dish/dishes.service.ts
async update(id: number, updateData: Partial<IDish>): Promise<Dish> {
  const dish = await this.findOne(id);
  if (!dish) {
    throw new NotFoundException(`Dish with ID ${id} not found`);
  }
  
  // Merge the existing dish with the update data
  Object.assign(dish, updateData);
  
  return await this.dishRepository.save(dish);
}


  async remove(id: number): Promise<void> {
    const result = await this.dishRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }

  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }

  async findOne(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({ where: { id } });
    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
    return dish;
  }
}

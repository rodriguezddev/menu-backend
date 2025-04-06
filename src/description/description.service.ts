// src/description/description.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Description } from './description.entity';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@Injectable()
export class DescriptionService {
  constructor(
    @InjectRepository(Description)
    private descriptionRepository: Repository<Description>,
  ) {}

  async create(createDescriptionDto: CreateDescriptionDto): Promise<Description> {
    const description = this.descriptionRepository.create(createDescriptionDto);
    return await this.descriptionRepository.save(description);
  }

  async findAll(): Promise<Description[]> {
    return await this.descriptionRepository.find();
  }

  async findOne(id: number): Promise<Description> {
    const description = await this.descriptionRepository.findOne({ where: { id } });
    if (!description) {
      throw new NotFoundException(`Description with ID ${id} not found`);
    }
    return description;
  }

  async update(id: number, updateDescriptionDto: UpdateDescriptionDto): Promise<Description> {
    const description = await this.findOne(id);
    Object.assign(description, updateDescriptionDto);
    return await this.descriptionRepository.save(description);
  }

  async remove(id: number): Promise<void> {
    const result = await this.descriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Description with ID ${id} not found`);
    }
  }
}

// src/description/description.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@ApiTags('descriptions')
@Controller('descriptions')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new description' })
  async create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.create(createDescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all descriptions' })
  async findAll() {
    return this.descriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a description by id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.descriptionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a description' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.descriptionService.update(id, updateDescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a description' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.descriptionService.remove(id);
  }
}

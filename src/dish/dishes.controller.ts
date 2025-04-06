import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './dish.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, storage } from './config/upload.config';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IDish } from './interfaces/dish.interface';

@ApiTags('dishes')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

@Post()
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['name', 'description', 'price', 'category'], // Image is not required
  },
})
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/dishes',
      filename: (req, file, callback) => {
        if (!file) {
          callback(null, '');
          return;
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }),
)
async create(
  @Body() createDishDto: CreateDishDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
      fileIsRequired: false,
    }),
  )
  file?: Express.Multer.File,
) {
  let dishData: IDish = {
    ...createDishDto,
    file: null, // Default to null if no image
  };

  if (file) {
    dishData.file = `/uploads/dishes/${file.filename}`;
  }

  return this.dishesService.create(dishData);
}



@Patch(':id')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/dishes',
      filename: (req, file, callback) => {
        if (!file) {
          callback(null, '');
          return;
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }),
)
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateDishDto: UpdateDishDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
      fileIsRequired: false,
    }),
  )
  file?: Express.Multer.File,
) {
  let updateData: Partial<IDish> = { ...updateDishDto };
  
  // If file is explicitly provided, update the image path
  if (file) {
    updateData.file = `/uploads/dishes/${file.filename}`;
  }

  return this.dishesService.update(id, updateData);
}





  @Delete(':id')
  @ApiOperation({ summary: 'Delete a dish' })
  @ApiResponse({ status: 200, description: 'The dish has been deleted successfully.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.dishesService.remove(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiResponse({ status: 200, description: 'Return all dishes.' })
  async findAll(): Promise<Dish[]> {
    return await this.dishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dish by id' })
  @ApiResponse({ status: 200, description: 'Return the dish.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Dish> {
    return await this.dishesService.findOne(id);
  }
}

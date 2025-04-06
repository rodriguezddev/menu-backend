// users.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    try {
      const user = this.userRepository.create({
        email: createUserDto.email,
        password: await bcryptjs.hash(createUserDto.password, BCRYPT_SALT_ROUNDS),
      });

      const savedUser = await this.userRepository.save(user);
      return new ResponseUserDto(savedUser);
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Update user fields
      Object.assign(user, {
        email: updateUserDto.email || user.email,
        password: updateUserDto.password
          ? await bcryptjs.hash(updateUserDto.password, BCRYPT_SALT_ROUNDS)
          : user.password,
      });

      const updatedUser = await this.userRepository.save(user);
      return new ResponseUserDto(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating user');
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error finding user');
    }
  }

  async findAll(): Promise<Array<ResponseUserDto>> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => new ResponseUserDto(user));
    } catch (error) {
      throw new BadRequestException('Error fetching users');
    }
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return new ResponseUserDto(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error finding user');
    }
  }

  async remove(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this.findOne(id);
      await this.userRepository.delete(id);
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error deleting user');
    }
  }
}

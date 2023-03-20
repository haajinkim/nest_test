/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';

import { ErrorMsg } from '../utils/util.error.msg';
import { hash } from '../utils/util.bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async findUser(id: number): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user.userId;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const hashPassword = await hash(updateUserDto.password);

    const data = {
      userId: updateUserDto.userId,
      password: hashPassword,
      name: updateUserDto.name,
      age: updateUserDto.age,
      gender: updateUserDto.gender,
    };

    try{
      const update = await this.prisma.user.update({
        where: { userId: updateUserDto.userId},
        data
      });
      return 'success'
    }
    catch(e) {
      if (e.meta.cause === 'Record to update not found.') {
        throw new BadRequestException(ErrorMsg.updateNotFound);
      }
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const hashPassword = await hash(createUserDto.password);

    const data = {
      userId: createUserDto.userId,
      password: hashPassword,
      name: createUserDto.name,
      age: createUserDto.age,
      gender: createUserDto.gender,
    };

    try {
      await this.prisma.user.create({ data });
      return 'success';
    } catch (err) {
      if (err.meta.target === 'User_userId_key') {
        throw new BadRequestException(ErrorMsg.duplicateId);
      }
      this.logger.error('e', err);
    }
  }

}

import { Injectable, Logger } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { ErrorMsg } from 'src/utils/util.error.msg';
import { CreateUserDto } from './dto/user.create.dto';

import { hash } from 'src/utils/util.bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashPassword = await hash(createUserDto.passWord);

    const data = {
      userId: createUserDto.userId,
      passWord: hashPassword,
      name: createUserDto.name,
      age: createUserDto.age,
      gender: createUserDto.gender,
    };

    try {
      const user = await this.prisma.user.create({ data });
      return user;
    } catch (err) {
      if (err.meta.target === 'User_userId_key') {
        throw new BadRequestException(ErrorMsg.duplicateId);
      }
      this.logger.error('e', err);
    }
  }
}

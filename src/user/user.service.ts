import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.create.dto';

import { hash } from 'src/utils/util.bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const hashPassword = await hash(createUserDto.password);

    const data = {
      userId: createUserDto.userId,
      passWord: hashPassword,
      name: createUserDto.name,
      age: createUserDto.age,
      gender: createUserDto.gender,
    };

    // const user = await this.prisma.user.create({ data });
    return 'success';
  }
}

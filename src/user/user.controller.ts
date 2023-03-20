import { Controller, Get, Body, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createDto);
  }
}

import { Controller, Get, Body, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<string> {
    return await this.userService.createUser(createDto);
  }
}

import { Controller, Get, Body, Post, Param, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { UpdateUserDto } from './dto/user.update.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async find(@Param('id') id: number): Promise<string> {
    return await this.userService.findUser(id);
  }

  @Get()
  async findMany(): Promise<User[]> {
    return await this.userService.findMany();
  }

  @Post()
  async create(@Body() createDto: CreateUserDto): Promise<string> {
    return await this.userService.createUser(createDto);
  }

  @Put()
  async update(@Body() updateDto: UpdateUserDto): Promise<string> {
    return await this.userService.updateUser(updateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<string> {
    return await this.userService.deleteUser(id);
  }
}

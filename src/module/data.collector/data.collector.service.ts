import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { User } from '@prisma/client';

import { firstValueFrom, lastValueFrom, map, Observable } from 'rxjs';

import { PrismaService } from 'src/prisma.service';
import { RedisService } from 'src/Redis/redis.service';

import { CreateDataCollectorDto } from './dto/create-data.collector.dto';
import { UpdateDataCollectorDto } from './dto/update-data.collector.dto';

@Injectable()
export class DataCollectorService {
  private readonly logger = new Logger(DataCollectorService.name);
  constructor(private prisma: PrismaService, private readonly axios: HttpService, private redisService: RedisService) {}

  //this renders the function every 15 minutes
  // @Cron('*/10 * * * * *')
  async create(createDataCollectorDto: CreateDataCollectorDto): Promise<User> {
    try {
      const { results }: any = await lastValueFrom(
        this.axios.get(`https://randomuser.me/api`).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );

      const params = {
        email: results[0].email,
        name: results[0].name,
        address: results[0].state,
        city: results[0].city,
        country: results[0].country,
        location: results[0].location,
      };

      const test = await this.redisService.get('test');
      console.log(test);

      const user: User = await this.prisma.user.create({ data: params });
      return user;
    } catch (error) {
      this.logger.error('error: ', error);
    }
  }

  async findAll() {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataCollector`;
  }

  update(id: number, updateDataCollectorDto: UpdateDataCollectorDto) {
    return `This action updates a #${id} dataCollector`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataCollector`;
  }
}

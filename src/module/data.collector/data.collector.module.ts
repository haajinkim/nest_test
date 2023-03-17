import { Module } from '@nestjs/common';
import { DataCollectorService } from './data.collector.service';
import { DataCollectorController } from './data.collector.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from 'src/Redis/redis.service';

@Module({
  imports: [HttpModule],
  controllers: [DataCollectorController],
  providers: [DataCollectorService, PrismaService, RedisService],
})
export class DataCollectorModule {}

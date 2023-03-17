import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { DataCollectorModule } from './module/data.collector/data.collector.module';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './Redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), HttpModule, RedisModule, DataCollectorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

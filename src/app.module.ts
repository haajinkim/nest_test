import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataCollectorModule } from './module/data.collector/data.collector.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from './prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(),  HttpModule, DataCollectorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

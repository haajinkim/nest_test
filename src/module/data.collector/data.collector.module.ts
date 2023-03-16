import { Module } from '@nestjs/common';
import { DataCollectorService } from './data.collector.service';
import { DataCollectorController } from './data.collector.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [DataCollectorController],
  providers: [DataCollectorService, PrismaService, ]
})
export class DataCollectorModule {}

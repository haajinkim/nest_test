import { CacheModule, Module } from '@nestjs/common';
import { DataCollectorService } from './data.collector.service';
import { DataCollectorController } from './data.collector.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from 'src/Redis/redis.service';

import * as redisStore from 'cache-manager-ioredis';
@Module({
  imports: [HttpModule,  
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 100000,
    })
  ],

  controllers: [DataCollectorController],
  providers: [DataCollectorService, PrismaService, RedisService ],
})


export class DataCollectorModule {}

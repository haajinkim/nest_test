import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { RedisService } from './redis.service';

const config = new ConfigService();

@Global()
@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: config.get('REDIS_URL'),
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModules {}

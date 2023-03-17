import { Module, CacheModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      // store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 100000,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}

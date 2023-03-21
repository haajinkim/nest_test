import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string): Promise<any> {
    return await this.redis.get(key);
  }

  async set(key: string, value: any, option?: any) {
    await this.redis.set(key, value, option);
  }

  async setEx(key: string, seconds: any, value: any) {
    await this.redis.setex(key, seconds, value);
  }

  async reset() {
    await this.redis.reset();
  }

  async del(key: string) {
    await this.redis.del(key);
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModules } from './user/user.module';

const config = new ConfigService();
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule.forRoot({
      config: {
        url: config.get('REDIS_URL'),
      },
    }),
    UserModules,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

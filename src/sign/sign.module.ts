import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

import { PrismaService } from '../prisma.service';

import { SignController } from './sign.controller';
import { SignService } from './sign.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRE')}`,
        },
      }),
    }),
  ],
  controllers: [SignController],
  providers: [PrismaService, SignService, RedisService],
})
export class SignModules {}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';

import { PrismaService } from '../prisma.service';
import { SignInDto } from './dto/sign.in.dto';

import { isHashValid } from '../utils/util.bcrypt';
import { ErrorMsg } from '../utils/util.error.msg';

@Injectable()
export class SignService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private redisService: RedisService,
  ) {}

  async signIn(body: SignInDto): Promise<{
    accessToken: string;
    refreshToken: string;
}> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: body.userId,
      },
    });

    if (!user) throw new BadRequestException(ErrorMsg.userIdNotFound);

    const hashValid = await isHashValid(body.password, user.password);
    if (!hashValid) throw new BadRequestException(ErrorMsg.passWordNotFound);

    const refreshToken = await this.getRefreshToken(user.id, user.name);
    const accessToken = await this.setAccessToken(user.id, user.name);

    return { accessToken, refreshToken};
  }

  async setAccessToken(userId: number, userName: string): Promise<string> {
    const payload = { userId, name: userName };
    const accessToken = this.jwtService.sign(payload,{expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRE')})
    return accessToken
  }

  async setRefreshToken(userId: number, userName: string) {
    const payload = { userId, name: userName };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRE'),
    });

    await this.redisService.setEx(
      `jwt:${userId}`,
      this.configService.get('JWT_REF_REDIS_EXPIRE'),
      refreshToken,
    );

    return refreshToken ;
  }

  async getRefreshToken(userId: number, userName: string): Promise<string> {
    const refToken = await this.redisService.get(`jwt:${userId}`);
    if (refToken) return refToken;
    else return await this.setRefreshToken(userId, userName);
  }
}

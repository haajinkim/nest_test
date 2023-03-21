import { Controller, Body, Post } from '@nestjs/common';

import { SignService } from './sign.service';
import { SignInDto } from './dto/sign.in.dto';

@Controller('sign')
export class SignController {
  constructor(private readonly userService: SignService) {}

  @Post()
  async signIn(@Body() signInDto: SignInDto): Promise<{
    accessToken: string;
    refreshToken: any;
  }> {
    return await this.userService.signIn(signInDto);
  }
}

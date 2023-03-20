import { IsNumber, IsString } from 'class-validator';

import { Gender } from '../interface/user.interface';

export class CreateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly passWord: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly gender: Gender;
}

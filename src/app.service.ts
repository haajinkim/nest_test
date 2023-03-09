import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(req): string {
    console.log(req.body);
    return 'Hello Worldsss!';
  }

  getTest(): string {
    return 'getTest입니다!.';
  }
}

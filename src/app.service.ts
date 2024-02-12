import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // constructor(private configService: ConfigService) {
  //   console.log('🚀 JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));
  // }
  getHello(): string {
    return 'Hello World!';
  }
}

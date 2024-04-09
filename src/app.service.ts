import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Assalamu Alikum, Welcome and Thank you so much for visiting my application';
  }
}

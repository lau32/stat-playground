import { Injectable } from '@nestjs/common';
import { Message } from '@stat-playground/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}

import { Controller, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Post('increment')
  incrementCounter() {
    this.counterService.handleRequest('/counter/increment');

    return {
      message: `Counter incremented`,
    };
  }
}

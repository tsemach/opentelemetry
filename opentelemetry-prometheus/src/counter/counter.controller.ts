import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Post('increment')
  incrementCounter() {
    this.counterService.handleRequest();

    return {
      message: `Counter incremented`,
    };
  }

  @Get()
  async getCounter() {
    const value = await this.counterService.getCounterValue();

    return {
      counter: JSON.stringify(value),
    };
  }
}

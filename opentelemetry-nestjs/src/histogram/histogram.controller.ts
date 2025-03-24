import { Controller, Post } from '@nestjs/common';
import { HistogramService } from './histogram.service';

@Controller('histogram')
export class HistogramController {
  constructor(private readonly historgramService: HistogramService) {}

  @Post('update')
  async updateHistogram() {
    await this.historgramService.handleRequest();

    return {
      message: `Histogram updated`,
    };
  }
}

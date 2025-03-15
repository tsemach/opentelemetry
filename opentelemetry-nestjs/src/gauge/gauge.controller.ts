import { Controller, Post } from '@nestjs/common';
import { GaugeService } from './gauge.service';

@Controller('gauge')
export class GaugeController {
  constructor(private readonly counterService: GaugeService) {}

  @Post('update')
  updateGauge() {
    this.counterService.handleRequest();

    return {
      message: `Gauge updated`,
    };
  }
}

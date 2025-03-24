import { Controller, Post } from '@nestjs/common';
import { GaugeService } from './gauge.service';

@Controller('gauge')
export class GaugeController {
  constructor(private readonly gaugeService: GaugeService) {}

  @Post('update')
  updateGauge() {
    this.gaugeService.handleRequest();

    return {
      message: `Gauge updated`,
    };
  }
}

import { Inject } from '@nestjs/common';

/**
 * Custom decorator to inject an OpenTelemetry metric.
 */
export const InjectOtelMetric = (name: string) => Inject(`OTEL_METRIC_${name}`);

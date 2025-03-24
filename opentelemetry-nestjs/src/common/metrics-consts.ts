export const METRICS = {
  OPENTELEMETRY_REQUESTS: {
    name: 'opentelemetry_requests_total',
    help: 'Opentelemetry counter for the number of requests',
  },
  COUNTER_REQUESTS: {
    name: 'counter_service_requests_total',
    help: 'Counter for the number of requests to the counter service',
  },
  GAUGE_REQUESTS: {
    name: 'gauge_requests_total',
    help: 'Gauge counter for the number of requests',
  },
  HISTOGRAM_REQUESTS: {
    name: 'histogram_requests_latency',
    help: 'Histogram for the duration of requests',
  },
};

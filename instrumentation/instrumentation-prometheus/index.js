const { MeterProvider } = require('@opentelemetry/sdk-metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Create a Prometheus Exporter
const exporter = new PrometheusExporter(
  { port: 9464 }, // Default Prometheus scrape port
  () => {
    console.log('Prometheus scrape endpoint: http://localhost:9464/metrics');
  }
);

// Create a Meter Provider
const meterProvider = new MeterProvider();
meterProvider.addMetricReader(exporter);

// Create a meter
const meter = meterProvider.getMeter('example-meter');

// Define a simple counter metric
const requestCounter = meter.createCounter('requests_total', {
  description: 'Total number of requests',
});

// Simulating request counting
function recordRequest() {
  requestCounter.add(1, { route: '/api' });
}

// Simulate calls
setInterval(recordRequest, 5000);

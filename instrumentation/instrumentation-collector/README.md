from : https://opentelemetry.io/docs/languages/js/getting-started/nodejs/

## Collector
https://opentelemetry.io/docs/collector/quick-start/

$GOBIN/telemetrygen traces --otlp-insecure --traces 3

grep -E '^Span|(ID|Name|Kind|time|Status \w+)\s+:' ./collector-output.txt
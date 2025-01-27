import { metrics, trace, Span } from '@opentelemetry/api';

const tracer = trace.getTracer('dice-lib');
const meter = metrics.getMeter('dice-lib');
const counter = meter.createCounter('dice-lib.rolls.counter');
const upDownCounter = meter.createUpDownCounter('dice-lib.rolls.upDownCounter');

function rollOnce(i: number, min: number, max: number) {
  return tracer.startActiveSpan(`rollOnce:${i}`, (span: Span) => {
    const result = Math.floor(Math.random() * (max - min + 1) + min);

    counter.add(1);
    upDownCounter.add(Math.random() > 0.5 ? 1 : -1);
    span.setAttribute('dice.rolled', result.toString());
    span.end();

    return result;
  });
}

export function rollTheDice(rolls: number, min: number, max: number) {
  return tracer.startActiveSpan('rollTheDice', (span: Span) => {
    const result: number[] = [];

    for (let i = 0; i < rolls; i++) {
      result.push(rollOnce(i, min, max));
    }

    span.end();
    return result;
  });
}

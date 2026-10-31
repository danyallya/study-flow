import { describe, expect, it } from 'vitest';
import { createTimer, remainingLabel, tickTimer, toggleTimer } from './timer';
describe('elapsed focus time', () => {
  it('accounts for delayed callbacks and excludes paused time', () => {
    let timer = toggleTimer(createTimer(25), 1000);
    timer = tickTimer(timer, 61_000);
    expect(remainingLabel(timer)).toBe('24:00');
    timer = toggleTimer(timer, 91_000);
    expect(remainingLabel(timer)).toBe('23:30');
    timer = tickTimer(timer, 900_000);
    expect(remainingLabel(timer)).toBe('23:30');
    timer = toggleTimer(timer, 900_000);
    expect(remainingLabel(tickTimer(timer, 930_000))).toBe('23:00');
  });
  it('clamps completion at zero and never resumes completed work', () => {
    const done = tickTimer(toggleTimer(createTimer(1), 0), 100_000);
    expect(done.status).toBe('completed'); expect(remainingLabel(done)).toBe('00:00');
    expect(toggleTimer(done, 101_000)).toBe(done);
  });
});

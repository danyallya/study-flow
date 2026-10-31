export type FocusTimerState = { durationMs: number; elapsedMs: number; startedAt: number | null; status: 'ready' | 'running' | 'paused' | 'completed' };
export function createTimer(minutes: number): FocusTimerState {
  if (!Number.isFinite(minutes) || minutes <= 0) throw new Error('Timer duration must be positive.');
  return { durationMs: minutes * 60_000, elapsedMs: 0, startedAt: null, status: 'ready' };
}
export function tickTimer(state: FocusTimerState, now: number): FocusTimerState {
  if (state.status !== 'running' || state.startedAt === null) return state;
  const elapsedMs = Math.min(state.durationMs, state.elapsedMs + Math.max(0, now - state.startedAt));
  return { ...state, elapsedMs, startedAt: elapsedMs === state.durationMs ? null : now, status: elapsedMs === state.durationMs ? 'completed' : 'running' };
}
export function toggleTimer(state: FocusTimerState, now: number): FocusTimerState {
  if (state.status === 'completed') return state;
  if (state.status === 'running') {
    const next = tickTimer(state, now);
    return next.status === 'completed' ? next : { ...next, status: 'paused', startedAt: null };
  }
  return { ...state, status: 'running', startedAt: now };
}
export function remainingLabel(state: FocusTimerState): string {
  const seconds = Math.ceil((state.durationMs - state.elapsedMs) / 1000);
  return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

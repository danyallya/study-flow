import { useEffect, useRef, useState } from 'react';
import { createTimer, remainingLabel, tickTimer, toggleTimer } from './domain/timer';

export function FocusTimer({ minutes, onComplete }: { minutes: number; onComplete: () => void }) {
  const [timer, setTimer] = useState(() => createTimer(minutes));
  const notified = useRef(false);
  useEffect(() => {
    if (timer.status !== 'running') return;
    const update = () => setTimer(current => tickTimer(current, performance.now()));
    const id = window.setInterval(update, 250);
    document.addEventListener('visibilitychange', update);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', update); };
  }, [timer.status]);
  useEffect(() => {
    if (timer.status === 'completed' && !notified.current) { notified.current = true; onComplete(); }
  }, [timer.status, onComplete]);
  return <>
    <div className="timer-face"><svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="84" className="timer-track"/><circle cx="100" cy="100" r="84" className="timer-progress" style={{ strokeDasharray: 528, strokeDashoffset: 528 * timer.elapsedMs / timer.durationMs }}/></svg>
      <div className="timer-label"><span>TIME TO FOCUS</span><b role="timer" aria-label="Time remaining">{remainingLabel(timer)}</b><small>MINUTES REMAINING</small></div>
    </div>
    <div className="timer-actions"><button className="start-button" disabled={timer.status === 'completed'} onClick={() => setTimer(current => toggleTimer(current, performance.now()))}>{timer.status === 'running' ? 'Pause session' : timer.status === 'paused' ? 'Resume session' : timer.status === 'completed' ? 'Session complete' : 'Begin focus'}</button>
      <button className="skip-button" disabled={timer.status === 'completed'} onClick={() => setTimer(current => ({ ...current, status: 'completed', elapsedMs: current.durationMs, startedAt: null }))}>Mark complete</button>
    </div><p role="status">{timer.status === 'completed' ? 'Session complete. Take a gentle break.' : timer.status === 'paused' ? 'Session paused. Resume whenever you are ready.' : timer.status === 'running' ? 'Focus session running.' : 'Ready when you are.'}</p>
  </>;
}

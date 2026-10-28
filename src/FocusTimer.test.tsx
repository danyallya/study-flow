import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FocusTimer } from './FocusTimer';
afterEach(() => { cleanup(); vi.useRealTimers(); });
describe('focus timer controls', () => {
  it('pauses, resumes and completes exactly once', () => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'performance'] });
    const complete = vi.fn(); render(<FocusTimer minutes={1} onComplete={complete}/>);
    fireEvent.click(screen.getByText('Begin focus'));
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByRole('timer')).toHaveTextContent('00:50');
    fireEvent.click(screen.getByText('Pause session'));
    act(() => vi.advanceTimersByTime(30_000));
    expect(screen.getByRole('timer')).toHaveTextContent('00:50');
    fireEvent.click(screen.getByText('Resume session'));
    act(() => vi.advanceTimersByTime(50_000));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00');
    expect(complete).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Mark complete')).toBeDisabled();
  });
  it('allows deliberate early completion without starting', () => {
    const complete = vi.fn(); render(<FocusTimer minutes={25} onComplete={complete}/>);
    fireEvent.click(screen.getByText('Mark complete'));
    expect(complete).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent('Take a gentle break');
  });
});

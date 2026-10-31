import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
afterEach(cleanup);
describe('Stillroom Study Flow', () => {
  it('uses the planned duration and updates only the focused session on completion', () => {
    render(<App />);
    expect(screen.getByRole('timer')).toHaveTextContent('45:00');
    fireEvent.click(screen.getByText('Mark complete'));
    expect(screen.getByRole('timer')).toHaveTextContent('00:00');
    expect(screen.getByText(/45 min.*Completed/)).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Take a gentle break');
  });
  it('renders the focus workspace', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /A little more present/i })).toBeInTheDocument();
    expect(screen.getByText(/SAMPLE PLAN · A MOMENT FOR YOURSELF/i)).toBeInTheDocument();
    expect(screen.getByText('Tuesday, October 27')).toBeInTheDocument();
    expect(screen.getByText('Sample plan · changes reset when you reload.')).toBeInTheDocument();
    expect(screen.queryByText(/4 day rhythm/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/DAY STREAK/i)).not.toBeInTheDocument();
    expect(screen.getByText(/NO STREAK TRACKED/i)).toBeInTheDocument();
  });
});

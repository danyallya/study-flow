import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Stillroom Study Flow', () => {
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

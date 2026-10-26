import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Stillroom Study Flow', () => {
  it('renders the focus workspace', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /A little more present/i })).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import ArenaStatus from '../ArenaStatus';

describe('ArenaStatus Component', () => {
  test('renders status message', () => {
    const statusMessage = 'Batalha iniciada!';
    render(<ArenaStatus status={statusMessage} />);
    expect(screen.getByText(statusMessage)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Players from '../Players';

describe('Players Page', () => {
  test('renders players page without crashing', () => {
    render(<Players />);
    expect(screen.getByText(/Jogadores/i)).toBeInTheDocument();
  });
});

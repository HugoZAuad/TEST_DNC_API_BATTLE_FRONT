import React from 'react';
import { render, screen } from '@testing-library/react';
import ArenaHeader from '../ArenaHeader';

describe('ArenaHeader Component', () => {
  test('renders without crashing and displays header', () => {
    render(<ArenaHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import Monsters from '../Monsters';

describe('Monsters Page', () => {
  test('renders monsters page without crashing', () => {
    render(<Monsters />);
    expect(screen.getByText(/Monstros/i)).toBeInTheDocument();
  });
});

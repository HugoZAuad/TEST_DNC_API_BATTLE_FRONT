import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  test('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogadores/i)).toBeInTheDocument();
    expect(screen.getByText(/Monstros/i)).toBeInTheDocument();
  });
});

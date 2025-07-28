import React from 'react';
import { render, screen } from '@testing-library/react';
import ArenaPlayers from '../ArenaPlayers';

describe('ArenaPlayers Component', () => {
  const mockPlayers = [
    { id: 1, username: 'Player1' },
    { id: 2, username: 'Player2' },
  ];

  test('renders player names', () => {
    render(<ArenaPlayers players={mockPlayers} />);
    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
  });

  test('renders no players message when empty', () => {
    render(<ArenaPlayers players={[]} />);
    expect(screen.getByText(/Nenhum jogador disponível/i)).toBeInTheDocument();
  });
});

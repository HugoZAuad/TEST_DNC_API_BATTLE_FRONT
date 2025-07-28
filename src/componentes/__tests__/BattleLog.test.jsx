import React from 'react';
import { render, screen } from '@testing-library/react';
import BattleLog from '../BattleLog';

describe('BattleLog Component', () => {
  test('renders no data message when no battle data', () => {
    render(<BattleLog batalha={null} />);
    expect(screen.getByText(/Nenhum dado de batalha ainda/i)).toBeInTheDocument();
  });

  test('renders battle turns and actions', () => {
    const mockBattle = {
      turns: [
        { actions: ['Jogador 1 atacou', 'Jogador 2 defendeu'] },
        { actions: ['Jogador 1 usou especial', 'Jogador 2 atacou'] },
      ],
    };
    render(<BattleLog batalha={mockBattle} />);
    expect(screen.getByText(/Turno 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogador 1 atacou/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogador 2 defendeu/i)).toBeInTheDocument();
    expect(screen.getByText(/Turno 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogador 1 usou especial/i)).toBeInTheDocument();
    expect(screen.getByText(/Jogador 2 atacou/i)).toBeInTheDocument();
  });

  test('renders message when no actions in a turn', () => {
    const mockBattle = {
      turns: [
        { actions: [] },
      ],
    };
    render(<BattleLog batalha={mockBattle} />);
    expect(screen.getByText(/Nenhuma ação registrada neste turno/i)).toBeInTheDocument();
  });
});

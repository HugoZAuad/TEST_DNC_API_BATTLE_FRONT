import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SelecaoJogador from '../SelecaoJogador';
import api from '../../servicos/api';

jest.mock('../../servicos/api');

describe('SelecaoJogador Page', () => {
  const mockPlayers = [
    { id: 1, username: 'Jogador1' },
    { id: 2, username: 'Jogador2' },
  ];
  const mockMonsters = [
    { id: 1, name: 'Monstro1', hp: 100, attack: 20 },
    { id: 2, name: 'Monstro2', hp: 80, attack: 25 },
  ];

  beforeEach(() => {
    api.get.mockImplementation((url) => {
      if (url === '/players') {
        return Promise.resolve({ data: mockPlayers });
      }
      if (url === '/monsters') {
        return Promise.resolve({ data: mockMonsters });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  test('renders players and monsters lists', async () => {
    render(<SelecaoJogador />);
    await waitFor(() => {
      expect(screen.getByText('Jogador1')).toBeInTheDocument();
      expect(screen.getByText('Monstro1')).toBeInTheDocument();
    });
  });
});

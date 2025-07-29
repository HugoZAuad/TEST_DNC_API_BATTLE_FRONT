import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Arena from '../paginas/Arena';
import * as socketService from '../servicos/socket';

jest.mock('../servicos/socket', () => ({
  createSocket: jest.fn(() => ({
    on: jest.fn((event, cb) => {
      if (event === 'connect') {
        cb(); // simula conexão imediata
      }
    }),
    emit: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

const mockJogador = { id: '1', username: 'Player One' };
const mockMonstro = { id: 'm1', name: 'Dragon' };
const mockArenaId = 'arena123';

function renderWithRouter(state) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/arena', state }]}>
      <Routes>
        <Route path="/arena" element={<Arena />} />
        <Route path="/selecao" element={<div>Redirecionado para seleção</div>} />
        <Route path="/" element={<div>Redirecionado para home</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Arena Component', () => {
  it('should redirect if missing state', () => {
    renderWithRouter({});
    expect(screen.getByText(/Redirecionado para seleção/i)).toBeInTheDocument();
  });

  it('should render arena and simulate battle', async () => {
    renderWithRouter({ jogador: mockJogador, monstro: mockMonstro, arenaId: mockArenaId });

    expect(screen.getByText(/Aguardando início da batalha/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Batalha simulada com bot iniciada/i)).toBeInTheDocument();
      expect(screen.getByText(/Botzilla/)).toBeInTheDocument();
    });
  });

  it('should handle action click and update turn', async () => {
    renderWithRouter({ jogador: mockJogador, monstro: mockMonstro, arenaId: mockArenaId });

    await waitFor(() => screen.getByText(/Botzilla/));

    const attackButton = screen.getByRole('button', { name: /Atacar/i });
    fireEvent.click(attackButton);

    await waitFor(() => {
      expect(screen.getByText(/Player One usou attack contra bot123/i)).toBeInTheDocument();
    });
  });

  it('should cancel battle and redirect to home', async () => {
    renderWithRouter({ jogador: mockJogador, monstro: mockMonstro, arenaId: mockArenaId });

    await waitFor(() => screen.getByText(/Cancelar Batalha/i));
    fireEvent.click(screen.getByText(/Cancelar Batalha/i));

    expect(screen.getByText(/Redirecionado para home/i)).toBeInTheDocument();
  });
});

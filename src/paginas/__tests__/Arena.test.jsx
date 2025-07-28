import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Arena from '../Arena';

const mockLocationState = {
  jogador: { id: 1, username: 'Jogador1' },
  monstro: { id: 1, name: 'Monstro1', hp: 100, attack: 20 },
  arenaId: 'arena-global',
};

jest.mock('../../servicos/socket', () => ({
  createSocket: () => ({
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
    connected: true,
  }),
}));

describe('Arena Page', () => {
  test('renders without crashing and shows initial status', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/arena', state: mockLocationState }]}>
        <Routes>
          <Route path="/arena" element={<Arena />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Aguardando início da batalha/i)).toBeInTheDocument();
  });

  test('cancel battle button navigates home', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/arena', state: mockLocationState }]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/arena" element={<Arena />} />
        </Routes>
      </MemoryRouter>
    );

    const cancelButton = container.querySelector('.btn-cancelar');
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});

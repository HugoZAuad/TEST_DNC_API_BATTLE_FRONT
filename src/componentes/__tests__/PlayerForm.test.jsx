import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlayerForm from '../componentes/PlayerForm';
import api from '../servicos/api';

jest.mock('../servicos/api');

describe('PlayerForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um novo jogador com sucesso', async () => {
    api.post.mockResolvedValue({ data: {} });

    render(<PlayerForm onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByPlaceholderText(/Digite o nome/i), {
      target: { value: 'Novo Jogador' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/players', { username: 'Novo Jogador' });
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(screen.getByText(/Jogador criado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve atualizar jogador existente com sucesso', async () => {
    const jogador = { id: '1', username: 'Jogador Antigo' };
    api.patch.mockResolvedValue({ data: {} });

    render(
      <PlayerForm
        onSuccess={mockOnSuccess}
        playerToEdit={jogador}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue('Jogador Antigo')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Digite o nome/i), {
      target: { value: 'Jogador Atualizado' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Atualizar/i }));

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/players/1', {
        username: 'Jogador Atualizado',
      });
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(screen.getByText(/Jogador atualizado com sucesso/i)).toBeInTheDocument();
    });
  });

  it('deve chamar onCancel ao clicar em Cancelar', () => {
    const jogador = { id: '1', username: 'Jogador Antigo' };

    render(
      <PlayerForm
        onSuccess={mockOnSuccess}
        playerToEdit={jogador}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});

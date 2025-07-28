import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerForm from '../PlayerForm';

describe('PlayerForm Component', () => {
  test('renders form inputs and submits data', () => {
    const handleSubmit = jest.fn();
    render(<PlayerForm onSubmit={handleSubmit} />);

    const usernameInput = screen.getByLabelText(/Nome de usuário/i);
    const submitButton = screen.getByRole('button', { name: /Salvar/i });

    expect(usernameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: 'Jogador Teste' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});

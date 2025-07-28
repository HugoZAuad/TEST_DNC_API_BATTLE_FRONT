import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonsterForm from '../MonsterForm';

describe('MonsterForm Component', () => {
  test('renders form inputs and submits data', () => {
    const handleSubmit = jest.fn();
    render(<MonsterForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText(/Nome/i);
    const hpInput = screen.getByLabelText(/HP/i);
    const attackInput = screen.getByLabelText(/Ataque/i);
    const submitButton = screen.getByRole('button', { name: /Salvar/i });

    expect(nameInput).toBeInTheDocument();
    expect(hpInput).toBeInTheDocument();
    expect(attackInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Monstro Teste' } });
    fireEvent.change(hpInput, { target: { value: '100' } });
    fireEvent.change(attackInput, { target: { value: '20' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});

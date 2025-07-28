import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BattleControls from '../BattleControls';

describe('BattleControls Component', () => {
  const mockOnAction = jest.fn();

  beforeEach(() => {
    mockOnAction.mockClear();
  });

  test('renders all action buttons', () => {
    render(<BattleControls onAction={mockOnAction} />);
    expect(screen.getByText('Atacar')).toBeInTheDocument();
    expect(screen.getByText('Defender')).toBeInTheDocument();
    expect(screen.getByText('Especial')).toBeInTheDocument();
    expect(screen.getByText('Desistir')).toBeInTheDocument();
  });

  test('calls onAction with correct action on button click', () => {
    render(<BattleControls onAction={mockOnAction} />);
    fireEvent.click(screen.getByText('Atacar'));
    expect(mockOnAction).toHaveBeenCalledWith('attack');
    fireEvent.click(screen.getByText('Defender'));
    expect(mockOnAction).toHaveBeenCalledWith('defend');
    fireEvent.click(screen.getByText('Especial'));
    expect(mockOnAction).toHaveBeenCalledWith('special');
    fireEvent.click(screen.getByText('Desistir'));
    expect(mockOnAction).toHaveBeenCalledWith('forfeit');
  });
});

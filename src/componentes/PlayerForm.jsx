import React, { useState } from 'react';
import api from '../servicos/api';
import Button from './Button';

import '../estilos/PlayerForm.css';

function PlayerForm({ onSuccess, playerToEdit, onCancel }) {
  const [name, setName] = useState(playerToEdit ? playerToEdit.username : '');
  const [message, setMessage] = useState('');
  const isEdit = Boolean(playerToEdit);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.patch(`/players/${playerToEdit.id}`, { username: name });
        setMessage('Jogador atualizado com sucesso!');
      } else {
        await api.post('/players', { username: name })
        setMessage('Jogador criado com sucesso!');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar jogador:', error);
      alert('Erro ao salvar jogador');
    }
  }

  return (
    <form className="playerForm" onSubmit={handleSubmit}>
      <label>
        Nome: 
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder='Digite o nome do jogador'
        />
      </label>
      <Button type="submit">{isEdit ? 'Atualizar' : 'Criar'}</Button>
      {isEdit && <Button type="button" onClick={onCancel}>Cancelar</Button>}
      {message && <p className="successMessage">{message}</p>}
    </form>
  );
}

export default PlayerForm;

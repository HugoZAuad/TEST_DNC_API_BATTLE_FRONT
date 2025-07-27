import React, { useEffect, useState } from 'react';
import api from '../servicos/api';
import PlayerForm from '../componentes/PlayerForm';
import '../estilos/Players.css';

function Players() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchPlayers() {
    try {
      const response = await api.get('/players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  function handleEdit(player) {
    setEditingPlayer(player);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm('Tem certeza que deseja excluir este jogador?')) {
      api.delete(`/players/${id}`)
        .then(() => fetchPlayers())
        .catch(err => console.error('Erro ao excluir jogador:', err));
    }
  }

  function handleFormSuccess() {
    setShowForm(false);
    setEditingPlayer(null);
    fetchPlayers();
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingPlayer(null);
  }

  return (
    <div className="players-container">
      <h1>Jogadores</h1>
      {showForm ? (
        <PlayerForm className="players-list"
          playerToEdit={editingPlayer}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Novo Jogador</button>
          <ul className="players-list">
            {players.map(player => (
              <li key={player.id}>
                {player.username}{' '}
                <button onClick={() => handleEdit(player)}>Editar</button>{' '}
                <button onClick={() => handleDelete(player.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Players;

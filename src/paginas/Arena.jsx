import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../servicos/socket';
import '../estilos/Arena.css';

function Arena() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jogador, monstro } = location.state || {};
  const [batalha, setBatalha] = useState(null);
  const [status, setStatus] = useState('Aguardando início da batalha...');

  useEffect(() => {
    if (!jogador || !monstro) {
      return;
    }

    socket.emit('playerAvailable', { playerId: jogador.id });

    socket.emit('startBattle', { playerId: jogador.id });

    socket.on('availableConfirmed', () => {
      setStatus('Jogador disponível para batalha. Aguardando oponente...');
    });

    socket.on('waitingForPlayer', (data) => {
      setStatus(data.message);
    });

    socket.on('battleStarted', (data) => {
      setBatalha(data.battleState);
      setStatus('Batalha iniciada!');
    });

    socket.on('battleUpdate', (data) => {
      setBatalha(data);
    });

    socket.on('error', (message) => {
      setStatus(`Erro: ${message}`);
    });

    return () => {
      socket.off('availableConfirmed');
      socket.off('waitingForPlayer');
      socket.off('battleStarted');
      socket.off('battleUpdate');
      socket.off('error');
    };
  }, [jogador, monstro]);

  if (!jogador || !monstro) {
    return <div className="arena-container">Seleção inválida. Volte para a tela de seleção.</div>;
  }

  function handleCancelarBatalha() {
    navigate('/');
  }

  return (
    <div className="arena-container">
      <h1 className="arena-header">Arena de Batalha</h1>
      <div className="arena-players">
        <div className="arena-player">
          <h2>Jogador: {jogador.username}</h2>
        </div>
        <div className="arena-monster">
          <h3>Monstro: {monstro.name}</h3>
        </div>
      </div>

      <div className="arena-status">
        <h3>Status da Batalha</h3>
        <p>{status}</p>
        {batalha && (
          <pre>{JSON.stringify(batalha, null, 2)}</pre>
        )}
      </div>

      <button className="btn-cancelar" onClick={handleCancelarBatalha}>Cancelar Batalha</button>
    </div>
  );
}

export default Arena;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../servicos/socket';
import ArenaHeader from '../componentes/ArenaHeader';
import ArenaPlayers from '../componentes/ArenaPlayers';
import ArenaStatus from '../componentes/ArenaStatus';
import BattleControls from '../componentes/BattleControls';
import BattleLog from '../componentes/BattleLog';
import '../estilos/Arena.css';

function Arena() {
  const location = useLocation();
  const navigate = useNavigate();
  const { jogador, monstro, arenaId } = location.state || {};
  const [batalha, setBatalha] = useState(null);
  const [status, setStatus] = useState('Aguardando início da batalha...');

  useEffect(() => {
    if (!jogador || !monstro || !arenaId) return;

    const onConnect = () => {
      console.log('Socket conectado no front:', socket.id);

      // 1. Faz o join na arena
      console.log('Emitindo joinArena', { arenaId, player_id: jogador.id, monster_id: monstro.id });
      socket.emit('joinArena', { arenaId, player_id: jogador.id, monster_id: monstro.id });

      // 2. Sinaliza disponibilidade e pede para iniciar batalha
      console.log('Emitindo playerAvailable', { playerId: jogador.id, arenaId });
      socket.emit('playerAvailable', { playerId: jogador.id, arenaId });

      console.log('Emitindo startBattle', { playerId: jogador.id, arenaId });
      socket.emit('startBattle', { playerId: jogador.id, arenaId });
    };

    socket.on('connect', onConnect);

    socket.on('availableConfirmed', () => {
      setStatus('Jogador disponível para batalha. Aguardando oponente...');
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

    socket.on('connect_error', (err) => {
      console.log('Erro de conexão do socket:', err);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('availableConfirmed');
      socket.off('battleStarted');
      socket.off('battleUpdate');
      socket.off('error');
      socket.off('connect_error');
    };
  }, [jogador, monstro, arenaId]);

  function handleCancelarBatalha() {
    navigate('/');
  }

  function handleAction(action) {
    socket.emit('battleAction', {
      arenaId: batalha?.arenaId || arenaId,
      playerId: jogador.id,
      action,
    });
  }

  if (!jogador || !monstro) {
    return <div className="arena-container">Seleção inválida. Volte para a tela de seleção.</div>;
  }

  return (
    <div className="arena-container">
      <ArenaHeader />
      <ArenaPlayers jogador={jogador} monstro={monstro} />
      <ArenaStatus status={status} />
      {batalha && <BattleControls onAction={handleAction} />}
      <BattleLog batalha={batalha} />
      <button className="btn-cancelar" onClick={handleCancelarBatalha}>Cancelar Batalha</button>
    </div>
  );
}

export default Arena;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createSocket } from '../servicos/socket';
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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!jogador || !monstro || !arenaId) {
      navigate('/selecao');
      return;
    }

    // Declare battleSocket in the scope of useEffect
    let battleSocket = null;

    // Connect to default socket namespace
    const defaultSocket = createSocket();
    setSocket(defaultSocket);

    function onConnect() {
      console.log('Socket conectado no front:', defaultSocket.id);
      defaultSocket.emit('joinArena', { arenaId, player_id: jogador.id, monster_id: monstro.id });
      defaultSocket.emit('playerAvailable', { playerId: jogador.id, arenaId });
    }

    defaultSocket.on('connect', onConnect);

    defaultSocket.on('availableConfirmed', (data) => {
      if (data && data.isBot) {
        setStatus('Um robô foi encontrado! Preparando para a batalha...');
      } else {
        setStatus('Jogador disponível para batalha. Aguardando oponente...');
      }
    });

    defaultSocket.on('battleStarted', (data) => {
      console.log('Evento battleStarted recebido:', data);
      setBatalha(data);
      setStatus('Batalha iniciada!');

      // Join the battle room on the default socket namespace
      defaultSocket.emit('joinBattle', data.battleId);

      // Listen for battle updates and other events on defaultSocket
      defaultSocket.on('battleUpdate', (update) => {
        setBatalha(update);
      });

      defaultSocket.on('battleEnded', (result) => {
        setStatus('Batalha encerrada!');
        // Handle battle end logic here
      });

      defaultSocket.on('error', (message) => {
        console.error('Erro recebido do socket:', message);
        const errorMsg = typeof message === 'object' ? JSON.stringify(message) : message;
        setStatus(`Erro: ${errorMsg}`);
      });

      defaultSocket.on('connect_error', (err) => {
        console.log('Erro de conexão do socket:', err);
      });
    });

    return () => {
      defaultSocket.off('connect', onConnect);
      defaultSocket.off('availableConfirmed');
      defaultSocket.off('battleStarted');
      defaultSocket.off('connect_error');
      if (battleSocket) {
        battleSocket.disconnect();
      }
      socket?.disconnect();
    };
  }, [jogador, monstro, arenaId, navigate]);

  function handleCancelarBatalha() {
    navigate('/');
  }

  function handleAction(action) {
    console.log('handleAction called with action:', action);
    if (socket && batalha) {
      console.log('Socket connected:', socket.connected);
      if (action === 'forfeit') {
        // Confirm surrender before emitting
        if (window.confirm('Você tem certeza que deseja desistir da batalha?')) {
          console.log('Emitting battleAction for forfeit');
          socket.emit('battleAction', {
            arenaId: batalha.arenaId || arenaId,
            battleId: batalha.battleId,
            playerId: jogador.id,
            action,
          });
        }
      } else {
        const targetId = batalha.monsters.find(m => m.playerId !== jogador.id)?.id;
        console.log('Emitting battleAction for action:', action, 'targetId:', targetId);
        socket.emit('battleAction', {
          arenaId: batalha.arenaId || arenaId,
          battleId: batalha.battleId,
          playerId: jogador.id,
          action,
          target_id: targetId,
        });
      }
    } else {
      console.warn('Socket or battle state not ready');
    }
  }

  if (!jogador || !monstro) {
    return <div className="arena-container">Seleção inválida. Volte para a tela de seleção.</div>;
  }

  // Extract opponent player and monster from battle state, including bot data
  let adversario = batalha?.players?.find(p => p.playerId !== jogador.id);
  let monstroAdversario = null;

  if (adversario) {
    monstroAdversario = batalha?.monsters?.find(m => m.playerId === adversario.playerId);
  } else if (batalha?.players?.length === 2) {
    // If no adversario found, try to find bot player
    adversario = batalha.players.find(p => p.isBot);
    if (adversario) {
      monstroAdversario = batalha.monsters.find(m => m.playerId === adversario.playerId);
    }
  }

  const isPlayerTurn = batalha?.currentTurnPlayerId === jogador.id;

  return (
    <div className="arena-container">
      <ArenaHeader />
      <ArenaPlayers jogador={jogador} monstro={monstro} adversario={adversario} monstroAdversario={monstroAdversario} />
      <ArenaStatus status={status} />
      {batalha && <BattleControls onAction={handleAction} disabled={!isPlayerTurn} />}
      <BattleLog batalha={batalha} />
      {!batalha && <button className="btn-cancelar" onClick={handleCancelarBatalha}>Cancelar Batalha</button>}
    </div>
  );
}

export default Arena;

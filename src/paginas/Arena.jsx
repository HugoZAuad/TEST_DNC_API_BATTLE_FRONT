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

    defaultSocket.on('availableConfirmed', () => {
      setStatus('Jogador disponível para batalha. Aguardando oponente...');
    });

    defaultSocket.on('battleStarted', (data) => {
      console.log('Evento battleStarted recebido:', data);
      setBatalha(data);
      setStatus('Batalha iniciada!');

      // Disconnect from default socket and connect to battle namespace
      defaultSocket.disconnect();
      battleSocket = createSocket(data.battleId);
      setSocket(battleSocket);

      battleSocket.on('connect', () => {
        console.log('Conectado ao namespace da batalha:', battleSocket.id);
      });

      battleSocket.on('battleUpdate', (update) => {
        setBatalha(update);
      });

      battleSocket.on('battleEnded', (result) => {
        setStatus('Batalha encerrada!');
        // Handle battle end logic here
      });

      battleSocket.on('error', (message) => {
        console.error('Erro recebido do socket:', message);
        const errorMsg = typeof message === 'object' ? JSON.stringify(message) : message;
        setStatus(`Erro: ${errorMsg}`);
      });

      battleSocket.on('connect_error', (err) => {
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
    if (socket && batalha) {
      if (action === 'forfeit') {
        // Confirm surrender before emitting
        if (window.confirm('Você tem certeza que deseja desistir da batalha?')) {
          socket.emit('battleAction', {
            arenaId: batalha.arenaId || arenaId,
            battleId: batalha.battleId,
            playerId: jogador.id,
            action,
          });
        }
      } else {
        socket.emit('battleAction', {
          arenaId: batalha.arenaId || arenaId,
          battleId: batalha.battleId,
          playerId: jogador.id,
          action,
        });
      }
    }
  }

  if (!jogador || !monstro) {
    return <div className="arena-container">Seleção inválida. Volte para a tela de seleção.</div>;
  }

  // Extract opponent player and monster from battle state
  const adversario = batalha?.players?.find(p => p.playerId !== jogador.id);
  const monstroAdversario = adversario ? batalha?.monsters?.find(m => m.playerId === adversario.playerId) : null;

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

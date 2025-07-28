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

    const defaultSocket = createSocket();
    setSocket(defaultSocket);

    defaultSocket.on('connect', () => {
      console.log('Socket conectado:', defaultSocket.id);
      defaultSocket.emit('joinArena', { arenaId, player_id: jogador.id, monster_id: monstro.id });
      defaultSocket.emit('playerAvailable', { playerId: jogador.id, arenaId });

      // Simulação de batalha com bot para testes
      setTimeout(() => {
        const fakeBattle = {
          arenaId,
          battleId: 'fake123',
          players: [
            { playerId: jogador.id, username: jogador.username },
            { playerId: 'bot123', username: 'Bot', isBot: true }
          ],
          monsters: [
            { playerId: jogador.id, name: monstro.name },
            { playerId: 'bot123', name: 'Botzilla' }
          ],
          currentTurnPlayerId: jogador.id,
          turns: []
        };
        setBatalha(fakeBattle);
        setStatus('Batalha simulada com bot iniciada!');
      }, 1000);
    });

    return () => {
      defaultSocket.disconnect();
    };
  }, [jogador, monstro, arenaId, navigate]);

  function handleAction(action) {
    console.log('Ação clicada:', action);
    if (!batalha || !socket) return;

    if (action === 'forfeit') {
      if (window.confirm('Você tem certeza que deseja desistir da batalha?')) {
        navigate('/');
      }
    } else {
      const targetId = batalha.monsters.find(m => m.playerId !== jogador.id)?.playerId;
      console.log(`Emitindo ação: ${action} contra ${targetId}`);
      socket.emit('battleAction', {
        arenaId: batalha.arenaId,
        battleId: batalha.battleId,
        playerId: jogador.id,
        action,
        target_id: targetId
      });

      // Simulação de resposta do turno
      const newTurn = {
        actions: [`${jogador.username} usou ${action} contra ${targetId}`]
      };
      setBatalha(prev => ({
        ...prev,
        turns: [...(prev.turns || []), newTurn],
        currentTurnPlayerId: 'bot123'
      }));
    }
  }

  if (!jogador || !monstro) {
    return <div className="arena-container">Seleção inválida. Volte para a tela de seleção.</div>;
  }

  const adversario = batalha?.players?.find(p => p.playerId !== jogador.id);
  const monstroAdversario = batalha?.monsters?.find(m => m.playerId === adversario?.playerId);
  const isPlayerTurn = batalha?.currentTurnPlayerId === jogador.id;

  return (
    <div className="arena-container">
      <ArenaHeader />
      <ArenaPlayers jogador={jogador} monstro={monstro} adversario={adversario} monstroAdversario={monstroAdversario} />
      <ArenaStatus status={status} />
      {batalha && <BattleControls onAction={handleAction} disabled={!isPlayerTurn} />}
      <BattleLog batalha={batalha} />
      {!batalha && <button className="btn-cancelar" onClick={() => navigate('/')}>Cancelar Batalha</button>}
    </div>
  );
}

export default Arena;

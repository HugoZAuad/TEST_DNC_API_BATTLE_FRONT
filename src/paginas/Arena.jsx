import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socket from '../servicos/socket';

function Arena() {
  const location = useLocation();
  const { jogador, monstro } = location.state || {};
  const [batalha, setBatalha] = useState(null);

  useEffect(() => {
    if (!jogador || !monstro) {
      // Redirecionar ou mostrar erro se dados não estiverem disponíveis
      return;
    }

    socket.emit('entrarNaArena', { jogadorId: jogador.id, monstroId: monstro.id });

    socket.on('atualizacaoBatalha', (dadosBatalha) => {
      setBatalha(dadosBatalha);
    });

    return () => {
      socket.off('atualizacaoBatalha');
    };
  }, [jogador, monstro]);

  if (!jogador || !monstro) {
    return <div>Seleção inválida. Volte para a tela de seleção.</div>;
  }

  return (
    <div>
      <h1>Arena de Batalha</h1>
      <div>
        <h2>Jogador: {jogador.name}</h2>
        <h3>Monstro: {monstro.name}</h3>
      </div>

      {batalha ? (
        <div>
          <h3>Status da Batalha</h3>
          <pre>{JSON.stringify(batalha, null, 2)}</pre>
          {/* Aqui você pode criar componentes para mostrar os stats, ações e botões */}
        </div>
      ) : (
        <div>Aguardando início da batalha...</div>
      )}
    </div>
  );
}

export default Arena;

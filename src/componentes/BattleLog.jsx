import '../estilos/BattleLog.css';

function BattleLog({ batalha }) {
  if (!batalha) {
    return (
      <div className="arena-status">
        <h3>Histórico da Batalha</h3>
        <p>Nenhum dado de batalha ainda.</p>
      </div>
    );
  }

  const turns = batalha.turns || [];

  return (
    <div className="arena-status">
      <h3>Histórico de Turnos</h3>
      {turns.length > 0 ? (
        <div>
          {turns.map((turn, index) => (
            <div key={index} style={{ marginBottom: '1em' }}>
              <strong>Turno {index + 1}</strong>
              <ul>
                {turn.actions?.length > 0 ? (
                  turn.actions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))
                ) : (
                  <li>Nenhuma ação registrada neste turno.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Aguardando ações...</p>
      )}
    </div>
  );
}

export default BattleLog;

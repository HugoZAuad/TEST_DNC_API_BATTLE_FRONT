import '../estilos/BattleLog.css';

function BattleLog({ batalha }) {
  if (!batalha) {
    return (
      <div className="arena-status">
        <h3>Estado da Batalha</h3>
        <p>Nenhum dado de batalha ainda.</p>
      </div>
    );
  }

  // Assuming batalha has a property 'turnLogs' which is an array of action descriptions
  const turnLogs = batalha.turnLogs || [];

  return (
    <div className="arena-status">
      <h3>Estado da Batalha</h3>
      {turnLogs.length > 0 ? (
        <ul>
          {turnLogs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      ) : (
        <pre>{JSON.stringify(batalha, null, 2)}</pre>
      )}
    </div>
  );
}

export default BattleLog;

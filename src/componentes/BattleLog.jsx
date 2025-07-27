import '../estilos/BattleLog.css';

function BattleLog({ batalha }) {
  return (
    <div className="arena-status">
      <h3>Estado da Batalha</h3>
      {batalha ? <pre>{JSON.stringify(batalha, null, 2)}</pre> : <p>Nenhum dado de batalha ainda.</p>}
    </div>
  );
}

export default BattleLog;

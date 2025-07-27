import '../estilos/BattleControls.css';

function BattleControls({ onAction }) {
  return (
    <div className="battle-controls">
      <button onClick={() => onAction('attack')}>Atacar</button>
      <button onClick={() => onAction('defend')}>Defender</button>
      <button onClick={() => onAction('special')}>Especial</button>
      <button onClick={() => onAction('forfeit')}>Desistir</button>
    </div>
  );
}

export default BattleControls;

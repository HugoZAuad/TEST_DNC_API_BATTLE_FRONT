import '../estilos/BattleControls.css';

function BattleControls({ onAction, disabled }) {
  return (
    <div className="battle-controls">
      <button disabled={disabled} onClick={() => onAction('attack')}>Atacar</button>
      <button disabled={disabled} onClick={() => onAction('defend')}>Defender</button>
      <button disabled={disabled} onClick={() => onAction('special')}>Especial</button>
      <button onClick={() => onAction('forfeit')}>Desistir</button>
    </div>
  );
}

export default BattleControls;

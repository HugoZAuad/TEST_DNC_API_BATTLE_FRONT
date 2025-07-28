import '../estilos/ArenaPlayers.css';

function ArenaPlayers({ jogador, monstro, adversario, monstroAdversario }) {
  return (
    <div className="arena-players">
      <div className="arena-player left">
        <h2>Jogador: {jogador.username}</h2>
        <h3>Monstro: {monstro.name}</h3>
      </div>
      <div className="arena-player right">
        <h2>Adversário: {adversario ? adversario.username : 'Aguardando...'}</h2>
        <h3>Monstro: {monstroAdversario ? monstroAdversario.name : 'Aguardando...'}</h3>
      </div>
    </div>
  );
}

export default ArenaPlayers;

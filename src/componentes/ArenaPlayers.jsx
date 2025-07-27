import '../estilos/ArenaPlayers.css';

function ArenaPlayers({ jogador, monstro }) {
  return (
    <div className="arena-players">
      <div className="arena-player">
        <h2>Jogador: {jogador.username}</h2>
      </div>
      <div className="arena-monster">
        <h3>Monstro: {monstro.name}</h3>
      </div>
    </div>
  );
}

export default ArenaPlayers;

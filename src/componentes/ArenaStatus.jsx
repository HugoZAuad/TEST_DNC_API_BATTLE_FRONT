import '../estilos/ArenaStatus.css';

function ArenaStatus({ status }) {
  return (
    <div className="arena-status">
      <h3>Status da Batalha</h3>
      <p>{status}</p>
    </div>
  );
}

export default ArenaStatus;

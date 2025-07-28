import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../servicos/api';
import '../estilos/selecaojogador.css';

function SelecaoJogador() {
  const [jogadores, setJogadores] = useState([]);
  const [monstros, setMonstros] = useState([]);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);
  const [monstroSelecionado, setMonstroSelecionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const resJogadores = await api.get('/players');
        setJogadores(resJogadores.data);
        const resMonstros = await api.get('/monsters');
        setMonstros(resMonstros.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    fetchData();
  }, []);

  function handleStartBattle() {
    if (jogadorSelecionado && monstroSelecionado) {
      // Use um arenaId fixo para todos entrarem juntos (ou gere um UUID se preferir)
      const arenaId = 'arena-global';
      navigate('/arena', { state: { jogador: jogadorSelecionado, monstro: monstroSelecionado, arenaId } });
    } else {
      alert('Selecione um jogador e um monstro para começar a batalha.');
    }
  }

  return (
    <div className='selecao-jogador'>
      <h1>Selecione o jogador e o monstro</h1>
      <div className="selection-column">
        <h2>Jogadores</h2>
        <ul>
          {jogadores.map(jogador => (
            <li key={jogador.id}>
              <input
                type="radio"
                id={`jogador-${jogador.id}`}
                name="jogador"
                value={jogador.id}
                onChange={() => setJogadorSelecionado(jogador)}
                checked={jogadorSelecionado ? jogadorSelecionado.id === jogador.id : false}
              />
              <label htmlFor={`jogador-${jogador.id}`}>{jogador.username}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="selection-column">
        <h2>Monstros</h2>
        <ul>
          {monstros.map(monstro => (
            <li key={monstro.id}>
              <input
                type="radio"
                id={`monstro-${monstro.id}`}
                name="monstro"
                value={monstro.id}
                onChange={() => setMonstroSelecionado(monstro)}
                checked={monstroSelecionado ? monstroSelecionado.id === monstro.id : false}
              />
              <label htmlFor={`monstro-${monstro.id}`}>
                {monstro.name} (HP: {monstro.hp}, Ataque: {monstro.attack})
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleStartBattle} disabled={!(jogadorSelecionado && monstroSelecionado)}>
        Começar Batalha
      </button>
    </div>
  );
}

export default SelecaoJogador;
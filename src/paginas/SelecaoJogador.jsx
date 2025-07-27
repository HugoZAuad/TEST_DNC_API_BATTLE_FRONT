import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../servicos/api';

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
      navigate('/arena', { state: { jogador: jogadorSelecionado, monstro: monstroSelecionado } });
    } else {
      alert('Selecione um jogador e um monstro para começar a batalha.');
    }
  }

  return (
    <div>
      <h1>Seleção de Jogador e Monstro</h1>

      <div>
        <h2>Jogadores</h2>
        <ul>
          {jogadores.map(jogador => (
            <li key={jogador.id}>
              <label>
                <input
                  type="radio"
                  name="jogador"
                  value={jogador.id}
                  onChange={() => setJogadorSelecionado(jogador)}
                />
                {jogador.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Monstros</h2>
        <ul>
          {monstros.map(monstro => (
            <li key={monstro.id}>
              <label>
                <input
                  type="radio"
                  name="monstro"
                  value={monstro.id}
                  onChange={() => setMonstroSelecionado(monstro)}
                />
                {monstro.name} (HP: {monstro.hp}, Ataque: {monstro.attack})
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleStartBattle}>Começar Batalha</button>
    </div>
  );
}

export default SelecaoJogador;

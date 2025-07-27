import React, { useState } from 'react';
import api from '../servicos/api';

import '../estilos/MonsterForm.css';

function MonsterForm({ onSuccess, monsterToEdit, onCancel }) {
  const [name, setName] = useState(monsterToEdit ? monsterToEdit.name : '');
  const [hp, setHp] = useState(monsterToEdit ? monsterToEdit.hp : '');
  const [attack, setAttack] = useState(monsterToEdit ? monsterToEdit.attack : '');
  const [defense, setDefense] = useState(monsterToEdit ? monsterToEdit.defense : '');
  const [speed, setSpeed] = useState(monsterToEdit ? monsterToEdit.speed : '');
  const [special, setSpecial] = useState(monsterToEdit ? monsterToEdit.special : '');
  const isEdit = Boolean(monsterToEdit);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        name,
        hp: Number(hp),
        attack: Number(attack),
        defense: Number(defense),
        speed: Number(speed),
        special,
      };
      if (isEdit) {
        await api.patch(`/monsters/${monsterToEdit.id}`, data);
      } else {
        await api.post('/monsters', data);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar monstro:', error);
      alert('Erro ao salvar monstro');
    }
  }

  return (
    <form className="monsterForm" onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        HP:
        <input
          type="number"
          value={hp}
          onChange={e => setHp(e.target.value)}
          required
          min="0"
        />
      </label>
      <label>
        Ataque:
        <input
          type="number"
          value={attack}
          onChange={e => setAttack(e.target.value)}
          required
          min="0"
        />
      </label>
      <label>
        Defesa:
        <input
          type="number"
          value={defense}
          onChange={e => setDefense(e.target.value)}
          required
          min="0"
        />
      </label>
      <label>
        Velocidade:
        <input
          type="number"
          value={speed}
          onChange={e => setSpeed(e.target.value)}
          required
          min="0"
        />
      </label>
      <label>
        Habilidade Especial:
        <input
          type="text"
          value={special}
          onChange={e => setSpecial(e.target.value)}
          required
        />
      </label>
      <button type="submit">{isEdit ? 'Atualizar' : 'Criar'}</button>
      {isEdit && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

export default MonsterForm;

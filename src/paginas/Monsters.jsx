import React, { useEffect, useState } from "react";
import api from "../servicos/api";
import MonsterForm from "../componentes/MonsterForm";
import "../estilos/Monster.css";

function Monsters() {
  const [monsters, setMonsters] = useState([]);
  const [editingMonster, setEditingMonster] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchMonsters() {
    try {
      const response = await api.get("/monsters");
      setMonsters(response.data);
    } catch (error) {
      console.error("Erro ao buscar monstros:", error);
    }
  }

  useEffect(() => {
    fetchMonsters();
  }, []);

  function handleEdit(monster) {
    setEditingMonster(monster);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este monstro?")) {
      api
        .delete(`/monsters/${id}`)
        .then(() => fetchMonsters())
        .catch((err) => console.error("Erro ao excluir monstro:", err));
    }
  }

  function handleFormSuccess() {
    setShowForm(false);
    setEditingMonster(null);
    fetchMonsters();
  }

  function handleFormCancel() {
    setShowForm(false);
    setEditingMonster(null);
  }

  return (
    <div className="monster-container">
      <h1>Monstros</h1>
      {showForm ? (
        <MonsterForm
          className="monster-list"
          monsterToEdit={editingMonster}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Novo Monstro</button>
          <ul className="monster-list">
            {monsters.map((monster) => (
              <li key={monster.id}>
                {monster.name} (HP: {monster.hp}, Ataque: {monster.attack},
                Defesa: {monster.defense}, Velocidade: {monster.speed},
                Especial: {monster.specialAbility}){" "}
                <button onClick={() => handleEdit(monster)}>Editar</button>{" "}
                <button onClick={() => handleDelete(monster.id)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Monsters;

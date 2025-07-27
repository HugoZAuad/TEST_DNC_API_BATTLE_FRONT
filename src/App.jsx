import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import SelecaoJogador from './paginas/SelecaoJogador';
import Arena from './paginas/Arena';
import Players from './paginas/Players';
import Monsters from './paginas/Monsters';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SelecaoJogador />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/players" element={<Players />} />
        <Route path="/monsters" element={<Monsters />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

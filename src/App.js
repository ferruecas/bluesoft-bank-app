// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ConsultarSaldo from './components/ConsultarSaldo';
import './App.css'; // Importar el archivo CSS
import MovimientosRecientes from './components/MovimientosRecientes';
import Consignacion from './components/Consignacion';
import Retiro from './components/Retiro';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/saldos" element={<ConsultarSaldo />} />
        <Route path="/movimientos" element={<MovimientosRecientes />} />
        <Route path="/Consignacion" element={<Consignacion />} />
        <Route path="/Retiro" element={<Retiro />} />        
      </Routes>
    </Router>
  );
};

export default App;

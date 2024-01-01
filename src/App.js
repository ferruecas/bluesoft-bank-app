import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ConsultarSaldo from './components/ConsultarSaldo';
import './App.css'; 
import MovimientosRecientes from './components/MovimientosRecientes';
import Consignacion from './components/Consignacion';
import Retiro from './components/Retiro';
import Extractos from './components/Extractos';
import Reportes from './components/Reportes';

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
        <Route path="/Extractos" element={<Extractos />} /> 
        <Route path="/Reportes" element={<Reportes />} /> 
        Extractos  
      </Routes>
    </Router>
  );
};

export default App;

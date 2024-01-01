// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page"> {/* Asignar la clase específica */}
      <h2>Bienvenido a Bluesoft Bank</h2>
      <Link className="button-link" to="/saldos">Consultar Saldo</Link>
      <Link className="button-link" to="/movimientos">Movimientos Recientes</Link>
      <Link className="button-link" to="/consignacion">Realizar Consignación</Link>
      <Link className="button-link" to="/retiro">Realizar Retiro</Link></div>
  );
};

export default HomePage;

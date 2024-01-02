import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container>
      <div className="home-page">
        <h2>Bienvenido a Bluesoft Bank</h2>
        <nav className="navigation-links">
          <ul>
            <li><Link className="button-link" to="/saldos">Consultar Saldo</Link></li>
            <li><Link className="button-link" to="/movimientos">Movimientos Recientes</Link></li>
            <li><Link className="button-link" to="/Consignacion">Realizar Consignación</Link></li>
            <li><Link className="button-link" to="/retiro">Realizar Retiro</Link></li>
            <li><Link className="button-link" to="/extractos">Generar Extractos</Link></li>
            <li><Link className="button-link" to="/reportes">Generar Reportes</Link></li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default HomePage;

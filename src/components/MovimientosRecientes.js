import React, { useState } from 'react';
import { obtenerMovimientosApi } from '../api/api';
import { Table } from 'react-bootstrap';
import '../App.css'; 
import styled from 'styled-components';

const ConsultarMovimientosRecientes = () => {
  const [cantidad, setCantidad] = useState(0);
  const [cuentaId, setCuentaId] = useState(0);
  const [movimientos, setMovimientos] = useState([]);

  const StyledTable = styled(Table)`
  font-size: 16px; /* Ajusta el tamaño de la fuente */
  border-collapse: separate;
  border-spacing: 0 10px; /* Espaciado vertical entre las filas */

  thead th {
    background-color: #343a40;
    color: white;
  }

  tbody tr {
    transition: background-color 0.3s;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }

  td, th {
    border: 1px solid #dee2e6; /* Añade bordes a las celdas */
    padding: 10px; /* Añade espacio interno a las celdas */
  }
`;

  const consultarMovimientos = async () => {
    try {
      const response = await obtenerMovimientosApi(cuentaId, cantidad);
      debugger
      setMovimientos(response.data);
    } catch (error) {
      console.error('Error al consultar movimientos:', error);
    }
  };

  return (
    <div>
      <h2>Consultar Movimientos Recientes</h2>
      <label>Cantidad:</label>
      <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      <br />
      <label>ID de Cuenta:</label>
      <input type="number" value={cuentaId} onChange={(e) => setCuentaId(e.target.value)} />
      <br />
      <button onClick={consultarMovimientos}>Consultar Movimientos</button>

      {movimientos.length > 0 && (
        <div>
        <h2>Movimientos Recientes</h2>
        <StyledTable striped bordered hover>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((movimiento) => (
              <tr key={movimiento.transaccionId}>
                <td>{movimiento.tipo}</td>
                <td>{movimiento.monto}</td>
                <td>{new Date(movimiento.fechaTransaccion).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </StyledTable>
      </div>
      )}
    </div>
  );
};

export default ConsultarMovimientosRecientes;

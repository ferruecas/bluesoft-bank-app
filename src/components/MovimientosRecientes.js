import React, { useState } from 'react';
import { obtenerMovimientosApi } from '../api/api';
import { Table, Pagination } from 'react-bootstrap';
import '../App.css';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';

const ConsultarMovimientosRecientes = () => {
  const [cantidad, setCantidad] = useState(0);
  const [cuentaId, setCuentaId] = useState(0);
  const [movimientos, setMovimientos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const StyledTable = styled(Table)`
    font-size: 16px;
    border-collapse: separate;
    border-spacing: 0 10px;

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
      border: 1px solid #dee2e6;
      padding: 10px;
    }
  `;

  const StyledPagination = styled(Pagination)`
    margin-top: 20px;

    .page-item {
      display: inline-block;
      margin-right: 5px;
      border: 1px solid #ddd;
      border-radius: 3px;
      transition: background-color 0.3s;
      cursor: pointer;
    }

    .page-link {
      padding: 8px 12px;
      background-color: #fff;
      border: none;
      color: #4caf50;
      transition: background-color 0.3s;
    }

    .page-link:hover {
      background-color: #4caf50;
      color: #fff;
    }

    .active .page-link {
      background-color:#4caf50;
      color: #fff;
      border: none;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  `;

  const consultarMovimientos = async () => {
    try {
      const response = await obtenerMovimientosApi(cuentaId, cantidad);
      if (response.code === 200) {
        setMovimientos(response.data);
        if(response.data.length <=0){
          Swal.fire('Error', `No se encontro informacion`, 'error');
        }
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Swal.fire('Error', `Hubo un error al realizar la consulta: ${errorData.message}`, 'error');
      }
    } catch (error) {
      console.error('Error al consultar movimientos:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = movimientos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div>
        <h2>Consultar Movimientos Recientes</h2>
        <label>Cantidad:</label>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
        <br />
        <label>ID de Cuenta:</label>
        <input type="number" value={cuentaId} onChange={(e) => setCuentaId(e.target.value)} />
        <br />
        <button onClick={consultarMovimientos}>Consultar Movimientos</button>

        {currentItems.length > 0 && (
          <div>
            <h2>Movimientos Recientes</h2>
            <StyledTable striped bordered hover>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((movimiento) => (
                  <tr key={movimiento.transaccionId}>
                    <td>{movimiento.tipo}</td>
                    <td>{movimiento.monto}</td>
                    <td>{new Date(movimiento.fechaTransaccion).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
            <StyledPagination>
              {Array.from({ length: Math.ceil(movimientos.length / itemsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                  <span className="sr-only"></span>
                </Pagination.Item>
              ))}
            </StyledPagination>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ConsultarMovimientosRecientes;

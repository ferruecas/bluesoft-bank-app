// MovimientosRecientes.js
import React, { useState, useEffect } from 'react';
import { obtenerMovimientosApi } from '../api/api';


const MovimientosRecientes = ({ cuentaId }) => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    // Lógica para cargar los movimientos más recientes al cargar el componente
    const fetchMovimientos = async () => {
      try {
        const response = await obtenerMovimientosApi(cuentaId);
        setMovimientos(response.data);
      } catch (error) {
        console.error('Error al obtener movimientos:', error);
      }
    };

    fetchMovimientos();
  }, [cuentaId]);

  return (
    <div>
      <h2>Movimientos Recientes</h2>
      <ul>
        {movimientos.map((movimiento) => (
          <li key={movimiento.transaccionID}>
            Tipo: {movimiento.tipo}, Monto: {movimiento.monto}, Fecha: {movimiento.fechaTransaccion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovimientosRecientes;
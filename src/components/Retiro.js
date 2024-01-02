import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Container } from 'react-bootstrap';

const Retiro = () => {
  const [cuenta, setCuenta] = useState('');
  const [monto, setMonto] = useState('');

  // Agregamos el estado para las ciudades
  const [ciudadId, setCiudadId] = useState('');
  const [ciudades, setCiudades] = useState([]);

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await fetch('https://localhost:7192/api/Ciudad');
        if (response.ok) {
          const data = await response.json();
          setCiudades(data);
        } else {
          Swal.fire('Error', 'Hubo un error al obtener las ciudades');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al obtener las ciudades');
      }
    };

    fetchCiudades();
  }, []);

  const handleRetiro = async () => {
    if (!cuenta || cuenta.trim() === '0' || !monto || monto.trim() === '0' || !ciudadId || ciudadId.trim() === '0') {
      Swal.fire('Error', 'Todos los campos son obligatorios y deben ser diferentes de 0 o vacío.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7192/api/transaccion/retiro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuentaId: parseInt(cuenta),
          monto: parseFloat(monto),
          ciudadId: parseInt(ciudadId),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Swal.fire('Éxito', 'Retiro realizado con éxito', 'success');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Swal.fire('Error', `Hubo un error al realizar el retiro: ${errorData.message}`, 'error');
      }
    } catch (error) {
      console.error('Error al realizar el retiro:', error);
      Swal.fire('Error', 'Hubo un error al realizar el retiro', 'error');
    }
  };

  return (
    <Container>
      <div>
        <h2>Realizar Retiro</h2>
        <label>Número de Cuenta:</label>
        <input type="text" value={cuenta} onChange={(e) => setCuenta(e.target.value)} />

        <label>Monto:</label>
        <input type="text" value={monto} onChange={(e) => setMonto(e.target.value)} />
        <label>Ciudad:</label>
        <select value={ciudadId} onChange={(e) => setCiudadId(e.target.value)}>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.ciudadId} value={ciudad.ciudadId}>
              {ciudad.nombre}
            </option>
          ))}
        </select>

        <button onClick={handleRetiro}>Realizar Retiro</button>
      </div>
    </Container>
  );
};

export default Retiro;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { consultarSaldoApi } from '../api/api';
import { Container } from 'react-bootstrap';

const ConsultarSaldo = () => {
  const [cuenta, setCuenta] = useState('');
  const handleInputChange = (event) => {
    setCuenta(event.target.value);
  };

  const consultarSaldo = async () => {
    try {
      debugger
      const saldo = await consultarSaldoApi(cuenta);

      if (saldo.code === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Consulta de Saldo',
          text: `El saldo es: $${saldo.data}`,
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: saldo.data,
        });
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al consultar el saldo. Inténtalo de nuevo.',
      });
    }
  };

  return (
    <Container>
      <div>
        <h2>Consultar Saldo</h2>
        <label>
          Número de Cuenta:
          <input type="text" value={cuenta} onChange={handleInputChange} />
        </label>
        <button onClick={consultarSaldo}>Consultar Saldo</button>
      </div>
    </Container>
  );
};

export default ConsultarSaldo;

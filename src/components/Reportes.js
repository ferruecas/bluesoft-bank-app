import React, { useState } from 'react';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Container } from 'react-bootstrap';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Reportes = () => {
  const [mes, setMes] = useState('');

  const handleGenerarReportes = async () => {
    try {
      const response = await fetch(`https://localhost:7192/api/Transaccion/GetTransacciones`);
      if (response.ok) {
        const transacciones = await response.json();

        const documentDefinition = {
          content: [
            { text: 'Retiro mas de 1 millón', style: 'header' },
            { text: `Fecha: ${new Date()}`, style: 'subheader' },
            { text: '\n\n' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: [
                  ['#Cuenta', 'Monto', 'Fecha', 'Ciudad'],
                  ...transacciones.data.map((t) => [
                    t.cuentaId || '',
                    t.monto || '',
                    t.fechaTransaccion || '',
                    t.ciudadNombre || '',
                  ]),
                ],
              },
            },
          ],
          styles: {
            header: { fontSize: 18, bold: true },
            subheader: { fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
          },
        };

        pdfMake.createPdf(documentDefinition).download(`Extracto_${new Date()}.pdf`);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Swal.fire('Error', `Hubo un error al generar el extracto: ${errorData.message}`, 'error');
      }
    } catch (error) {
      console.error('Error al generar el extracto:', error);
      Swal.fire('Error', 'Hubo un error al generar el extracto', 'error');
    }
  };

  const handleListadoClientes = async () => {
    if (!mes) {
      Swal.fire('Error', 'Por favor, ingresa un número de mes válido.', 'error');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7192/api/Cliente/informe/${mes}`);
      if (response.ok) {
        const transacciones = await response.json();

        const documentDefinition = {
          content: [
            { text: 'Transacciones en el mes ' + mes, style: 'header' },
            { text: `Fecha: ${new Date()}`, style: 'subheader' },
            { text: '\n\n' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                  ['#Cliente', 'Nombre', '#Transacciones'],
                  ...transacciones.data.map((t) => [
                    t.clienteId || '',
                    t.nombre || '',
                    t.numeroTransacciones || 0,

                  ]),
                ],
              },
            },
          ],
          styles: {
            header: { fontSize: 18, bold: true },
            subheader: { fontSize: 10, bold: true, margin: [0, 0, 0, 10] },
          },
        };

        pdfMake.createPdf(documentDefinition).download(`Extracto_${new Date()}.pdf`);
        Swal.fire('Listado de Clientes', 'PDF generado con éxito', 'success');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Swal.fire('Error', `Hubo un error al generar el listado de clientes: ${errorData.message}`, 'error');
      }
    } catch (error) {
      console.error('Error al generar el listado de clientes:', error);
      Swal.fire('Error', 'Hubo un error al generar el listado de clientes', 'error');
    }
  };

  return (
  <Container>
    <div >
      <h2>Reportes</h2>
      <button onClick={handleGenerarReportes}>Reportes 1 Millón</button>

      <div></div>

      <label >Mes:</label>
      <input value={mes} onChange={(e) => setMes(e.target.value)} />

      <button onClick={handleListadoClientes}>Listado de Clientes</button>
    </div>
    </Container>
  );
};

export default Reportes;
